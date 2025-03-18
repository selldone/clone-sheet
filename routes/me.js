const express = require('express');
const db = require('../models'); // Adjust path as needed
const router = express.Router();

// Route to get shop information from the database
router.get('/', async (req, res) => {
    try {
        // Get selected shop ID from key-value table
        const selectedShopData = await db.KeyValue.findOne({
            where: { key: 'selected_shop_id' }
        });

        if (!selectedShopData || !selectedShopData.value) {
            return res.json({
                success: false,
                message: 'No shop selected'
            });
        }

        const shopId = selectedShopData.value;

        // Get shop data from shop table
        const shopData = await db.Shop.findOne({
            where: { id: shopId }
        });

        if (!shopData) {
            return res.json({
                success: false,
                message: 'Shop not found in database'
            });
        }

        // Return shop data
        return res.json({
            success: true,
            shop: shopData.dataValues
        });

    } catch (error) {
        console.error('Error fetching shop info:', error);
        return res.json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;