// routes/database.js
const express = require("express");
const router = express.Router();
const { Sequelize, Op } = require("sequelize");
const db = require("../models");
const {tables} = require("../src/TableConfig");

// Get table data dynamically
router.get("/get-table-data/:key", async (req, res) => {
    try {
        const { key } = req.params;
        const search = req.query.search || '';



        // Security check - only allow tables defined in TableConfig
        const allowedTables = Object.keys(tables);

        if (!allowedTables.includes(key)) {
            return res.status(403).json({
                success: false,
                message: `Access denied to this table! ${key} not found in TableConfig`
            });
        }

        // Get model name from mapping
        const modelName = tables[key].modelName;
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

        // Get sort parameters
        const sortField = req.query.sortField || 'id';
        const sortOrder = req.query.sortOrder === 'desc' ? 'DESC' : 'ASC';

        // Build search conditions if search parameter is provided
        let whereClause = {};
        if (search) {
            // Get searchable string fields from the model
            const stringAttributes = Object.keys(Model.rawAttributes).filter(
                attr => {
                    const type = Model.rawAttributes[attr].type;
                    return type &&
                        ['STRING', 'TEXT', 'CHAR', 'VARCHAR'].includes(type.key || type.constructor.key);
                }
            );

            if (stringAttributes.length > 0) {
                whereClause[Op.or] = stringAttributes.map(field => ({
                    [field]: { [Op.like]: `%${search}%` }
                }));
            }
        }

        // Fetch filtered data
        const rows = await Model.findAll({
            where: whereClause,
            limit,
            offset: (page - 1) * limit,
            order: [[sortField, sortOrder]]
        });

        // Get total count with the same filters
        const count = await Model.count({ where: whereClause });

        // Get column information
        const columnInfo = await db.sequelize.query(
            `SHOW COLUMNS FROM \`${tables[key].table}\``,
            { type: db.sequelize.QueryTypes.SELECT }
        );

        // Get ordered column names
        const columns = columnInfo.map(col => col.Field);

        // Reorder to put 'icon' after 'id' if it exists
        const iconIndex = columns.findIndex(col => col === 'icon');
        if (iconIndex !== -1) {
            columns.splice(iconIndex, 1);
            const idIndex = columns.findIndex(col => col === 'id');
            if (idIndex !== -1) {
                columns.splice(idIndex + 1, 0, 'icon');
            } else {
                columns.unshift('icon');
            }
        }

        return res.json({
            success: true,
            columns,
            rows: rows.map(row => row.toJSON()),
            totalRecords: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit)
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