"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            // A category belongs to a shop
            Category.belongsTo(models.Shop, { foreignKey: "shop_id" });

            // A category may have a parent category (self-referencing)
            Category.belongsTo(models.Category, { foreignKey: "parent_id", as: "ParentCategory" });

            // A category may have many subcategories (self-referencing)
            Category.hasMany(models.Category, { foreignKey: "parent_id", as: "SubCategories" });

            // Relations to other entities
          //  Category.belongsTo(models.Connect, { foreignKey: "connect_id" });
           // Category.belongsTo(models.Vendor, { foreignKey: "vendor_id" });
         //   Category.belongsTo(models.Page, { foreignKey: "page_id" });
         //   Category.belongsTo(models.ShopCluster, { foreignKey: "cluster_id" });
        }
    }

    Category.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            shop_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            connect_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
            },
            vendor_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
            },
            name: {
                type: DataTypes.STRING(32),
                allowNull: true,
            },
            order: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
            parent_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: true,
            },
            title: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            icon: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            star: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            visits: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            products: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            categories: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            filters: {
                type: DataTypes.TEXT,
                allowNull: true,
                get() {
                    const value = this.getDataValue("filters");
                    if (typeof value === "object") return value;

                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("filters", value ? JSON.stringify(value) : null);
                },
            },
            note: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
                get() {
                    const value = this.getDataValue("filters");
                    if (typeof value === "object") return value;

                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("filters", value ? JSON.stringify(value) : null);
                },
            },

            theme: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            augment: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
                get() {
                    const value = this.getDataValue("augment");
                    if (typeof value === "object") return value;

                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("augment", value ? JSON.stringify(value) : null);
                },
            },
            page_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: true,
            },
            cluster_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
            },
            translations: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
            },
            engine: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
                get() {
                    const value = this.getDataValue("engine");
                    if (typeof value === "object") return value;

                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("engine", value ? JSON.stringify(value) : null);
                },
            },


            // Dates:
            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: DataTypes.NOW,
            },

        },
        {
            sequelize,
            modelName: "Category",
            timestamps: true,
            underscored: true,
            paranoid: false, // Enables soft delete functionality
        }
    );

    return Category;
};
