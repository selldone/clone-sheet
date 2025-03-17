// routes/admin.js
const express = require("express");
const router = express.Router();
const { Product, Shop, Category,KeyValue,User } = require("../models");
const { Op } = require("sequelize");
const DatabaseCleaner = require("../src/utils/DatabaseCleaner");
// Route to clear (truncate) all data from products, shops, and categories tables
router.post("/clear-database", async (req, res) => {
    const result = await DatabaseCleaner.clear();
    if (result.success) {
        res.json(result);
    } else {
        res.status(500).json(result);
    }
});

module.exports = router;
