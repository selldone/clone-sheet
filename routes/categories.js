const express = require("express");
const router = express.Router();
const { KeyValue, Category } = require("../models");
const axios = require("axios");

const LIMIT = 50; // Number of categories to fetch per request

// ✅ Fetch and Store Categories
router.post("/fetch-categories", async (req, res) => {
    try {
        const tokenEntry = await KeyValue.findOne({ where: { key: "auth_token" } });
        const shopEntry = await KeyValue.findOne({ where: { key: "selected_shop_id" } });
        const lastUpdatedEntry = await KeyValue.findOne({ where: { key: "categories_last_updated_at" } });

        if (!tokenEntry || !shopEntry) {
            return res.status(400).json({ success: false, message: "❌ Token or shop ID is missing." });
        }

        let lastUpdatedAt = lastUpdatedEntry ? lastUpdatedEntry.value : "1970-01-01T00:00:00Z"; // Default to a long time ago
        let offset = 0;
        let hasMore = true;
        let totalFetched = 0;

        while (hasMore) {
            const response = await axios.get(`https://api.selldone.com/shops/${shopEntry.value}/database/categories/sync?shop_id=${shopEntry.value}&updated_at=${lastUpdatedAt}&limit=${LIMIT}&offset=${offset}`, {
                headers: { Authorization: tokenEntry.value, "Accept": "application/json" },
                timeout: 10000, // Set timeout to prevent infinite waiting
            });

            const categories = response.data.categories;
            if (!categories || categories.length === 0) break;

            // ✅ Save or update categories
            for (const category of categories) {
                await Category.upsert(category);
            }

            totalFetched += categories.length;
            offset += LIMIT;
            hasMore = categories.length === LIMIT; // Continue if more data exists
        }

        // ✅ Update `categories_last_updated_at`
        const latestUpdatedAt = new Date().toISOString();
        await KeyValue.upsert({ key: "categories_last_updated_at", value: latestUpdatedAt, type: "string" });

        res.json({ success: true, message: `✅ ${totalFetched} categories updated successfully!` });
    } catch (error) {
        console.error("❌ Error fetching categories:", error);
        res.status(500).json({ success: false, message: "❌ Error fetching categories." });
    }
});

module.exports = router;
