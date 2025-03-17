const express = require("express");
const router = express.Router();
const { KeyValue, Shop, Product, Category } = require("../models");
const axios = require("axios");

router.post("/fetch-shop", async (req, res) => {
    try {
        console.log("🛒 Fetching shop info...");
        const { shop_id } = req.body;

        if (!shop_id) {
            return res.status(400).json({ success: false, message: "❌ Shop ID is required." });
        }

        // Retrieve stored authentication token
        const tokenEntry = await KeyValue.findOne({ where: { key: "auth_token" } });
        if (!tokenEntry) {
            return res.status(401).json({ success: false, message: "❌ Token not found. Please authenticate first." });
        }

        // Check if the shop ID has changed from the previous value
        const oldShopEntry = await KeyValue.findOne({ where: { key: "selected_shop_id" } });
        if (oldShopEntry && oldShopEntry.value !== shop_id) {
            // If shop ID has changed, remove all data in products, shops, and categories tables
            await Product.destroy({ where: {}, truncate: true });
            await Shop.destroy({ where: {}, truncate: true });
            await Category.destroy({ where: {}, truncate: true });
            console.log("✅ Data in products, shops, and categories tables have been cleared due to shop change.");
        }

        // Fetch shop info from Selldone API
        const { data } = await axios.get(`https://api.selldone.com/shops/${shop_id}/database/shop/sync`, {
            headers: {
                Authorization: tokenEntry.value,
                "Accept": "application/json",
            },
            timeout: 10000, // 10 seconds timeout
        });

        if (!data || !data.shop) {
            return res.status(404).json({ success: false, message: "❌ Shop not found." });
        }

        // Save or update shop info in database
        await Shop.upsert(data.shop);

        // Store selected shop ID in KeyValue table
        await KeyValue.upsert({ key: "selected_shop_id", value: shop_id, type: "string" });

        res.json({ success: true, message: "✅ Shop data saved successfully!", shop: data.shop });
    } catch (error) {
        console.error("❌ Error fetching shop info:", error);

        if (error.response) {
            if (error.response.status === 403) {
                return res.status(403).json({ success: false, message: "❌ Authentication failed. Check your token." });
            } else if (error.response.status === 404) {
                return res.status(404).json({ success: false, message: "❌ Shop not found." });
            } else {
                return res.status(error.response.status).json({
                    success: false,
                    message: `❌ API Error ${error.response.status}: ${error.response.statusText}`,
                });
            }
        }
        res.status(500).json({ success: false, message: "❌ Error fetching shop info." });
    }
});

module.exports = router;
