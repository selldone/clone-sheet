const models = require("../../models");
const { Op } = require("sequelize");
const { query } = require("express");
const tableConfig = require("../../src/TableConfig");

class DatabaseCleaner {
    static async clear() {
        try {
            console.log("🚀 Starting database cleanup...");
            await query("SET FOREIGN_KEY_CHECKS = 0");

            const destroyPromises = [];

            // Special case for KeyValue
            destroyPromises.push(
                models.KeyValue.destroy({
                    where: { key: { [Op.like]: "%_updated_at" } }
                })
            );

            // Handle all other models
            const modelNames = tableConfig.getAllResources();
            modelNames.forEach(modelName => {
                // Skip KeyValue as it's handled separately
                if ( models[modelName]) {
                    destroyPromises.push(models[modelName].destroy({ where: {} }));
                }
            });

            await Promise.all(destroyPromises);
            await query("SET FOREIGN_KEY_CHECKS = 1");

            console.log("✅ Database cleanup completed successfully.");
            return { success: true, message: "✅ Database cleared successfully." };
        } catch (error) {
            console.error("❌ Error during database cleanup:", error);
            return { success: false, message: "❌ Error clearing database.", error };
        }
    }
}

module.exports = DatabaseCleaner;