// routes/database.js
const express = require("express");
const router = express.Router();
const { Sequelize } = require("sequelize");
const db = require("../models");

// Direct mapping between table names and model names
const TABLE_MODEL_MAP = {
    "products": "Product",
    "categories": "Category",
    "customers": "Customer",
    "shop_data": "ShopData",
    "key_values": "KeyValue",
    // Add any additional mappings here
};

// Get table data dynamically
router.get("/get-table-data/:tableName", async (req, res) => {
    try {
        const { tableName } = req.params;

        // Security check - only allow specific tables to be accessed
        const allowedTables = Object.keys(TABLE_MODEL_MAP);

        // Convert kebab-case to snake_case if needed
        const normalizedTable = tableName.replace(/-/g, "_");

        if (!allowedTables.includes(normalizedTable)) {
            return res.status(403).json({
                success: false,
                message: "Access denied to this table"
            });
        }

        // Get model name from mapping
        const modelName = TABLE_MODEL_MAP[normalizedTable];
        const Model = db[modelName];

        if (!Model) {
            return res.status(404).json({
                success: false,
                message: `Table model ${modelName} not found`
            });
        }

        // Fetch data with pagination
        const limit = parseInt(req.query.limit) || 100;
        const page = parseInt(req.query.page) || 1;

        const rows = await Model.findAll({
            limit,
            offset: (page - 1) * limit,
            order: [['id', 'DESC']]
        });

        const count = await Model.count();

        // Get column information first
        const columnInfo = await db.sequelize.query(
            `SHOW COLUMNS FROM \`${normalizedTable}\``,
            { type: db.sequelize.QueryTypes.SELECT }
        );

        // Get ordered column names
        const columns = columnInfo.map(col => col.Field);


        // Reorder to put 'icon' after 'id' if it exists
        const iconIndex = columns.findIndex(col => col === 'icon');
        if (iconIndex !== -1) {
            // Remove 'icon' from its current position
            columns.splice(iconIndex, 1);

            // Find the position of 'id' column
            const idIndex = columns.findIndex(col => col === 'id');

            // If 'id' exists, insert 'icon' right after it
            if (idIndex !== -1) {
                columns.splice(idIndex + 1, 0, 'icon');
            } else {
                // If 'id' doesn't exist, put 'icon' at the beginning
                columns.unshift('icon');
            }
        }



        return res.json({
            success: true,
            columns,
            rows: rows.map(row => row.toJSON()),
            totalRecords: count
        });

    } catch (error) {
        console.error("Error fetching table data:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching table data: " + error.message
        });
    }
});




module.exports = router;