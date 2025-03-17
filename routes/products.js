const express = require("express");
const router = express.Router();
const { KeyValue, Product } = require("../models");
const axios = require("axios");
const { sendProgressUpdate } = require("./progress");

const LIMIT = 50; // Number of products to fetch per request

// ✅ Fetch and Store Products
router.post("/fetch-products", async (req, res) => {
    try {
        sendProgressUpdate("products", "Starting product sync...", 0);

        const tokenEntry = await KeyValue.findOne({ where: { key: "auth_token" } });
        const shopEntry = await KeyValue.findOne({ where: { key: "selected_shop_id" } });
        const lastUpdatedEntry = await KeyValue.findOne({ where: { key: "products_last_updated_at" } });

        if (!tokenEntry || !shopEntry) {
            sendProgressUpdate("products", "❌ Token or shop ID is missing.", 100);
            return res.status(400).json({ success: false, message: "❌ Token or shop ID is missing." });
        }

        let lastUpdatedAt = lastUpdatedEntry ? lastUpdatedEntry.value : ''; // Default to a long time ago
        let offset = 0;
        let hasMore = true;
        let totalFetched = 0;
        let totalCount = 0;

        sendProgressUpdate("products", `Fetching products batch (offset: ${offset})...`, 0);


        while (hasMore) {

            // Fix: Corrected the URL parameter structure
            const response = await axios.get(`https://api.selldone.com/shops/${shopEntry.value}/database/products/sync`, {
                params:{
                    'updated_at': lastUpdatedAt,
                    'limit': LIMIT,
                    'offset': offset
                },
                headers: { Authorization: tokenEntry.value, "Accept": "application/json" },
                timeout: 10000, // Set global timeout to avoid infinite waiting
            });


            // Scope access check or other errors:
            if (response.data.error) {
                throw new Error(response.data.error_msg);
            }


            const products = response.data.products;
            if (!products || products.length === 0) break;


            if(!totalCount){
                // keep first total as the total available records after updated_at:
                totalCount = response.data.total ;
                sendProgressUpdate("products", `Found ${totalCount} products to sync`, 5);
            }

            // ✅ Save or update products
            sendProgressUpdate("products", `Processing ${products.length} products...`,
                  Math.min(Math.round((totalFetched / totalCount) * 100), 95) );

            for (let i = 0; i < products.length; i++) {
                const product = products[i];
                try {
                    await Product.upsert(product);
                    // Update progress every few products to avoid flooding the stream
                    if (i % 10 === 0) {
                        sendProgressUpdate("products", `Saved product '${product.title || product.id}'`,
                             Math.min(Math.round(((totalFetched + i) / totalCount) * 100), 95) );
                    }
                } catch (err) {
                    sendProgressUpdate("products", `Error with product '${product.title || product.id}': ${err.message}`,
                        Math.min(Math.round(((totalFetched + i) / totalCount) * 100), 95) );
                }
            }

            totalFetched += products.length;
            offset += LIMIT;
            hasMore = products.length === LIMIT; // Continue if more data exists
        }

        // ✅ Update `products_last_updated_at`
        const latestUpdatedAt = new Date().toISOString();
        await KeyValue.upsert({ key: "products_last_updated_at", value: latestUpdatedAt, type: "string" });

        sendProgressUpdate("products", `✅ ${totalFetched} products updated successfully!`, 100);
        res.json({ success: true, message: `✅ ${totalFetched} products updated successfully!`, fetchedCount: totalFetched });
    } catch (error) {
        console.error("❌ Error fetching products:", error);
        sendProgressUpdate("products", `❌ Error: ${error.message}`, 100);
        res.status(500).json({ success: false, message: "❌ Error fetching products." });
    }
});

module.exports = router;