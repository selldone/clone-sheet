const models = require("../../models");
const { Op } = require("sequelize");
const sequelize = require("../../models").sequelize;
const tableConfig = require("../../src/TableConfig");

class DatabaseCleaner {
    static async clear() {
        let transaction;

        try {
            console.log("🚀 Starting database cleanup...");

            transaction = await sequelize.transaction();

            // Disable foreign key checks
            await sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { transaction });

            // Special case for KeyValue - only delete specific keys
            await models.KeyValue.destroy({
                where: { key: { [Op.like]: "%_updated_at" } },
                transaction
            });

            // Get all tables from tableConfig
            const tableEntries = Object.entries(tableConfig.tables);

            // Truncate all tables except KeyValue which was handled separately
            for (const [key, tableInfo] of tableEntries) {
                if (models[tableInfo.modelName]) {
                    // Use the actual table name from the configuration or fallback to the table property
                    const tableName = tableInfo.table || key;
                    await sequelize.query(`TRUNCATE TABLE ${tableName}`, { transaction });
                    console.log(`✓ Truncated table: ${tableName}`);
                }
            }

            // Re-enable foreign key checks
            await sequelize.query("SET FOREIGN_KEY_CHECKS = 1", { transaction });

            // Commit the transaction
            await transaction.commit();

            console.log("✅ Database cleanup completed successfully.");
            return { success: true, message: "✅ Database cleared successfully." };
        } catch (error) {
            // Rollback transaction if there was an error
            if (transaction) await transaction.rollback();

            console.error("❌ Error during database cleanup:", error);
            return {
                success: false,
                message: "❌ Error clearing database.",
                error: error.message
            };
        }
    }
}

module.exports = DatabaseCleaner;