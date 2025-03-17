const { KeyValue, Product, Shop, Category, User } = require("../../models");
const { Op } = require("sequelize");
const {query} = require("express");

class DatabaseCleaner {
    /**
     * Clears specific database records.
     */
    static async clear() {
        try {
            console.log("🚀 Starting database cleanup...");

            // Disable foreign key checks for safe deletion
            await query("SET FOREIGN_KEY_CHECKS = 0");

            // Perform all deletions in parallel
            await Promise.all([
                KeyValue.destroy({
                    where: { key: { [Op.like]: "%_updated_at" } } // Delete only keys ending in "_updated_at"
                }),
                Product.destroy({ where: {} }),
                Category.destroy({ where: {} }),
            ]);

            // Re-enable foreign key checks
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
