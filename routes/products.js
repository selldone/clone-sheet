const express = require("express");
const router = express.Router();
const { KeyValue, Product } = require("../models");
const axios = require("axios");

const LIMIT = 50; // Number of products to fetch per request

// ✅ Fetch and Store Products
router.post("/fetch-products", async (req, res) => {
    try {
        const tokenEntry = await KeyValue.findOne({ where: { key: "auth_token" } });
        const shopEntry = await KeyValue.findOne({ where: { key: "selected_shop_id" } });
        const lastUpdatedEntry = await KeyValue.findOne({ where: { key: "products_last_updated_at" } });

        if (!tokenEntry || !shopEntry) {
            return res.status(400).json({ success: false, message: "❌ Token or shop ID is missing." });
        }

        let lastUpdatedAt = lastUpdatedEntry ? lastUpdatedEntry.value : "1970-01-01T00:00:00Z"; // Default to a long time ago
        let offset = 0;
        let hasMore = true;
        let totalFetched = 0;

        while (hasMore) {
            const response = await axios.get(`https://api.selldone.com/shops/${shopEntry.value}/database/products/sync?shop_id=updated_at=${lastUpdatedAt}&limit=${LIMIT}&offset=${offset}`, {
                headers: { Authorization: tokenEntry.value, "Accept": "application/json" },
                timeout: 10000, // Set global timeout to avoid infinite waiting
            });

            const products = response.data.products;
            if (products.length === 0) break;

            // ✅ Save or update products
            for (const product of products) {
                await Product.upsert(product);
            }

            totalFetched += products.length;
            offset += LIMIT;
            hasMore = products.length === LIMIT; // Continue if more data exists
        }

        // ✅ Update `products_last_updated_at`
        const latestUpdatedAt = new Date().toISOString();
        await KeyValue.upsert({ key: "products_last_updated_at", value: latestUpdatedAt, type: "string" });

        res.json({ success: true, message: `✅ ${totalFetched} products updated successfully!` });
    } catch (error) {
        console.error("❌ Error fetching products:", error);
        res.status(500).json({ success: false, message: "❌ Error fetching products." });
    }
});

module.exports = router;
