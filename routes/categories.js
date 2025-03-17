// routes/categories.js
const express = require("express");
const router = express.Router();
const {KeyValue, Category} = require("../models");
const axios = require("axios");
const {sendProgressUpdate} = require("./progress");

const LIMIT = 50; // Number of categories to fetch per request

// ✅ Fetch and Store Categories
router.post("/fetch-categories", async (req, res) => {
    try {
        sendProgressUpdate("categories", "Starting category sync...", 0);

        const tokenEntry = await KeyValue.findOne({where: {key: "auth_token"}});
        const shopEntry = await KeyValue.findOne({where: {key: "selected_shop_id"}});
        const lastUpdatedEntry = await KeyValue.findOne({where: {key: "categories_last_updated_at"}});

        if (!tokenEntry || !shopEntry) {
            sendProgressUpdate("categories", "❌ Token or shop ID is missing.", 100);
            return res.status(400).json({success: false, message: "❌ Token or shop ID is missing."});
        }

        let lastUpdatedAt = lastUpdatedEntry ? lastUpdatedEntry.value : ''; // Default to a long time ago
        let offset = 0;
        let hasMore = true;
        let totalFetched = 0;
        let totalCount = 0;

        // Get total count first for progress calculation

        sendProgressUpdate("categories", `Fetching categories batch (offset: ${offset})...`, 0);

        while (hasMore) {



            const response = await axios.get(`https://api.selldone.com/shops/${shopEntry.value}/database/categories/sync`, {
                params:{
                    'updated_at': lastUpdatedAt,
                    'limit': LIMIT,
                    'offset': offset
                },
                headers: {Authorization: tokenEntry.value, "Accept": "application/json"},
                timeout: 10000, // Set timeout to prevent infinite waiting
            });


            // Scope access check or other errors:
            if (response.data.error) {
                throw new Error(response.data.error_msg);
            }


            const categories = response.data.categories;
            if (!categories || categories.length === 0) break;

            if (!totalCount) {
                // keep first total as the total available records after updated_at:
                totalCount = response.data.total;
                sendProgressUpdate("categories", `Found ${totalCount} categories to sync`, 5);
            }


            // ✅ Save or update categories
            sendProgressUpdate("categories", `Processing ${categories.length} categories...`, Math.min(Math.round((totalFetched / totalCount) * 100), 95));
            for (let i = 0; i < categories.length; i++) {
                const category = categories[i];
                try {
                    await Category.upsert(category);
                    if (i % 5 === 0) {
                        sendProgressUpdate("categories", `Saved category '${category.title}'`, Math.min(Math.round(((totalFetched + i) / totalCount) * 100), 95));
                    }
                } catch (err) {
                    sendProgressUpdate("categories", `Error with category '${category.title || category.id}': ${err.message}`, Math.min(Math.round(((totalFetched + i) / totalCount) * 100), 95));
                }
            }

            totalFetched += categories.length;
            offset += LIMIT;
            hasMore = categories.length === LIMIT; // Continue if more data exists
        }

        // ✅ Update `categories_last_updated_at`
        const latestUpdatedAt = new Date().toISOString();
        await KeyValue.upsert({key: "categories_last_updated_at", value: latestUpdatedAt, type: "string"});

        sendProgressUpdate("categories", `✅ ${totalFetched} categories updated successfully!`, 100);
        res.json({success: true, message: `✅ ${totalFetched} categories updated successfully!`});
    } catch (error) {
        console.error("❌ Error fetching categories:", error);
        sendProgressUpdate("categories", `❌ Error: ${error.message}`, 100);
        res.status(500).json({success: false, message: "❌ Error fetching categories."});
    }
});

module.exports = router;