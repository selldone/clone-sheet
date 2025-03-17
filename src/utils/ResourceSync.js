// utils/ResourceFetcher.js
const axios = require("axios");
const { KeyValue } = require("../../models");
const { sendProgressUpdate } = require("./../../routes/progress");

class ResourceFetcher {
    constructor(options) {
        this.resourceType = options.resourceType; // e.g., "products", "categories"
        this.Model = options.Model; // Sequelize model
        this.singularName = options.singularName || this.resourceType.slice(0, -1);
        this.apiPath = options.apiPath || this.resourceType;
        this.responseKey = options.responseKey || this.resourceType;
        this.limit = options.limit || 50;
        this.titleField = options.titleField || "title";
    }

    /**
     * Send progress update with controlled frequency
     */
    updateProgress(message, progress, force = false) {
        // Only update if significant progress change or forced
        if (force || this.lastProgress === undefined || Math.abs(progress - this.lastProgress) >= 5) {
            this.lastProgress = progress;
            sendProgressUpdate(this.resourceType, message, progress);
        }
    }

    /**
     * Calculate overall progress based on stages
     * @param {number} stage - Current stage (0-3)
     * @param {number} stageProgress - Progress within current stage (0-100)
     */
    calculateProgress(stage, stageProgress) {
        // Divide overall progress into stages
        const stageWeights = [10, 20, 60, 10]; // Authorization, Discovery, Processing, Finalization

        // Calculate progress up to current stage
        let progress = 0;
        for (let i = 0; i < stage; i++) {
            progress += stageWeights[i];
        }

        // Add partial progress from current stage
        progress += (stageProgress * stageWeights[stage]) / 100;

        return Math.min(Math.round(progress), 99); // Cap at 99% until complete
    }

    async fetch(req, res) {
        this.lastProgress = 0;

        try {
            // Stage 0: Authorization (10%)
            this.updateProgress(`⚙️ Initializing ${this.resourceType} sync...`, 0, true);

            const tokenEntry = await KeyValue.findOne({ where: { key: "auth_token" } });
            const shopEntry = await KeyValue.findOne({ where: { key: "selected_shop_id" } });
            const lastUpdatedEntry = await KeyValue.findOne({
                where: { key: `${this.resourceType}_last_updated_at` }
            });

            if (!tokenEntry || !shopEntry) {
                this.updateProgress("❌ Token or shop ID is missing.", 100, true);
                return res.status(400).json({ success: false, message: "❌ Token or shop ID is missing." });
            }

            // Stage 1: Discovery (20%)
            this.updateProgress(`🔍 Checking for ${this.resourceType} updates...`, this.calculateProgress(1, 0), true);

            let lastUpdatedAt = lastUpdatedEntry ? lastUpdatedEntry.value : '';
            let offset = 0;
            let totalFetched = 0;
            let totalCount = 0;
            let batchCount = 0;

            // Fetch first batch to get total count
            const firstResponse = await axios.get(
                `https://api.selldone.com/shops/${shopEntry.value}/database/${this.apiPath}/sync`,
                {
                    params: {
                        'updated_at': lastUpdatedAt,
                        'limit': this.limit,
                        'offset': 0
                    },
                    headers: { Authorization: tokenEntry.value, "Accept": "application/json" },
                    timeout: 10000
                }
            );

            if (firstResponse.data.error) {
                throw new Error(firstResponse.data.error_msg);
            }

            const firstBatch = firstResponse.data[this.responseKey];
            if (!firstBatch || firstBatch.length === 0) {
                this.updateProgress(`✅ ${this.resourceType} are already up to date.`, 100, true);
                return res.json({
                    success: true,
                    message: `✅ ${this.resourceType} are already up to date.`,
                    fetchedCount: 0
                });
            }

            totalCount = firstResponse.data.total;
            this.updateProgress(
                `📦 Found ${totalCount} ${this.resourceType} to sync`,
                this.calculateProgress(1, 100),
                true
            );

            // Stage 2: Processing (60%)
            // Process first batch
            await this.processBatch(firstBatch, totalFetched, totalCount);
            totalFetched += firstBatch.length;
            offset += this.limit;
            batchCount++;

            // Continue fetching if needed
            let hasMore = firstBatch.length === this.limit;
            while (hasMore) {
                this.updateProgress(
                    `📥 Fetching ${this.resourceType} batch #${batchCount + 1}...`,
                    this.calculateProgress(2, (totalFetched / totalCount) * 100)
                );

                const response = await axios.get(
                    `https://api.selldone.com/shops/${shopEntry.value}/database/${this.apiPath}/sync`,
                    {
                        params: {
                            'updated_at': lastUpdatedAt,
                            'limit': this.limit,
                            'offset': offset
                        },
                        headers: { Authorization: tokenEntry.value, "Accept": "application/json" },
                        timeout: 10000
                    }
                );

                if (response.data.error) {
                    throw new Error(response.data.error_msg);
                }

                const items = response.data[this.responseKey];
                if (!items || items.length === 0) break;

                await this.processBatch(items, totalFetched, totalCount);

                totalFetched += items.length;
                offset += this.limit;
                batchCount++;
                hasMore = items.length === this.limit;
            }

            // Stage 3: Finalization (10%)
            this.updateProgress(
                `📝 Finalizing ${this.resourceType} sync...`,
                this.calculateProgress(3, 50),
                true
            );

            // Update last updated timestamp
            const latestUpdatedAt = new Date().toISOString();
            await KeyValue.upsert({
                key: `${this.resourceType}_last_updated_at`,
                value: latestUpdatedAt,
                type: "string"
            });

            this.updateProgress(`✅ ${totalFetched} ${this.resourceType} updated successfully!`, 100, true);
            return res.json({
                success: true,
                message: `✅ ${totalFetched} ${this.resourceType} updated successfully!`,
                fetchedCount: totalFetched
            });
        } catch (error) {
            console.error(`❌ Error fetching ${this.resourceType}:`, error);
            this.updateProgress(`❌ Error: ${error.message}`, 100, true);
            return res.status(500).json({ success: false, message: `❌ Error fetching ${this.resourceType}.` });
        }
    }

    /**
     * Process a batch of items
     */
    async processBatch(items, currentTotal, totalCount) {
        // Only send one update per batch, not per item
        this.updateProgress(
            `📊 Processing batch of ${items.length} ${this.resourceType}...`,
            this.calculateProgress(2, (currentTotal / totalCount) * 100),
            true
        );

        let successCount = 0;
        let errorCount = 0;

        for (const item of items) {
            try {
                await this.Model.upsert(item);
                successCount++;
            } catch (err) {
                errorCount++;
                console.error(`Error with ${this.singularName} '${item[this.titleField] || item.id}':`, err.message);
            }
        }

        // Only send one summary update after processing the batch
        const progressPct = this.calculateProgress(2, ((currentTotal + items.length) / totalCount) * 100);
        this.updateProgress(
            `✓ Processed ${successCount} ${this.resourceType}${errorCount > 0 ? ` (${errorCount} errors)` : ''}`,
            progressPct,
            errorCount > 0 // Force update if there were errors
        );
    }

    // Create route handler
    createHandler() {
        return (req, res) => this.fetch(req, res);
    }
}

module.exports = ResourceFetcher;