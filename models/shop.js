"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Shop extends Model {
        static associate(models) {
            // A shop belongs to a user (owner)
            Shop.belongsTo(models.User, { foreignKey: "user_id" });

            // A shop has many categories
            Shop.hasMany(models.Category, { foreignKey: "shop_id", as: "Categories" });

            // A shop has many products
            Shop.hasMany(models.Product, { foreignKey: "shop_id", as: "Products" });
        }
    }

    Shop.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                comment: "Unique shop identifier"
            },
            user_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                comment: "User ID who owns this shop"
            },
            model: {
                type: DataTypes.ENUM("normal", "wholesaler", "marketplace", "franchise", "dropshipping"),
                allowNull: false,
                defaultValue: "normal",
                comment: "Shop business model"
            },
            name: {
                type: DataTypes.STRING(128),
                allowNull: false,
                unique: true,
                comment: "Unique shop name/identifier"
            },
            home: {
                type: DataTypes.STRING(20),
                allowNull: true,
                comment: "Home page identifier"
            },
            language: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: "Default language"
            },
            title: {
                type: DataTypes.STRING(255),
                allowNull: false,
                comment: "Shop display title"
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Shop description"
            },
            icon: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Shop icon path"
            },
            fav: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: "Favicon path"
            },
            official: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
                comment: "Shop is officially verified"
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
                comment: "Shop is active/open"
            },
            restriction: {
                type: DataTypes.ENUM("PUBLIC", "PRIVATE", "RESTRICTED"),
                allowNull: false,
                defaultValue: "PUBLIC",
                comment: "Shop access restriction level"
            },
            license: {
                type: DataTypes.ENUM("FREE", "STARTUP", "COMPANY", "ENTERPRISE"),
                allowNull: false,
                defaultValue: "FREE",
                comment: "Shop license type"
            },
            domain: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: "Custom domain for shop"
            },
            capacity: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                defaultValue: 0,
                comment: "Storage capacity"
            },
            expire_at: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: "License expiration date"
            },
            info: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Additional shop information",
                get() {
                    const value = this.getDataValue("info");
                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("info", value ? JSON.stringify(value) : null);
                },
            },
            support_mode: {
                type: DataTypes.ENUM("24h7d", "normal", "none"),
                allowNull: false,
                defaultValue: "normal",
                set(value) {
                    // If value is empty or not one of the allowed ones, set default "normal"
                    if (!value || !["24h7d", "normal", "none"].includes(value)) {
                        this.setDataValue("support_mode", "normal");
                    } else {
                        this.setDataValue("support_mode", value);
                    }
                },
                comment: "Support mode for shop"
            },
            support: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
                comment: "Support details",
                get() {
                    const value = this.getDataValue("support");
                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("support", value ? JSON.stringify(value) : null);
                },
            },
            address_verified: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: "Verified address"
            },
            phone_verified: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: "Verified phone number"
            },
            gold: {
                type: DataTypes.TINYINT.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
                comment: "Gold status level",
                get() {
                    return Boolean(this.getDataValue("gold")); // Convert to boolean
                }
            },
            options: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
                comment: "Shop options",
                get() {
                    const value = this.getDataValue("options");
                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("options", value ? JSON.stringify(value) : null);
                },
            },
            penalty: {
                type: DataTypes.TINYINT.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
                comment: "Penalty points",
                get() {
                    return Boolean(this.getDataValue("penalty")); // Convert to boolean
                }
            },
            purge_at: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: "Scheduled purge date"
            },
            currencies: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Available currencies",
                get() {
                    const value = this.getDataValue("currencies");
                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("currencies", value ? JSON.stringify(value) : null);
                },
            },
            footer: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Footer content",
                get() {
                    const value = this.getDataValue("footer");
                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("footer", value ? JSON.stringify(value) : null);
                },
            },
            local: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Local settings",
                get() {
                    const value = this.getDataValue("local");
                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("local", value ? JSON.stringify(value) : null);
                },
            },
            sub: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Subscription details",
                get() {
                    const value = this.getDataValue("sub");
                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("sub", value ? JSON.stringify(value) : null);
                },
            },
            countries: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Supported countries",
                get() {
                    const value = this.getDataValue("countries");
                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("countries", value ? JSON.stringify(value) : null);
                },
            },
            lottery: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Lottery configuration",
                get() {
                    const value = this.getDataValue("lottery");
                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("lottery", value ? JSON.stringify(value) : null);
                },
            },
            tax: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Tax settings",
                get() {
                    const value = this.getDataValue("tax");
                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("tax", value ? JSON.stringify(value) : null);
                },
            },
            layout_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                comment: "Layout reference ID"
            },
            layout_version: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: "Layout version"
            },
            theme: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
                comment: "Theme configuration",
                get() {
                    const value = this.getDataValue("theme");
                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("theme", value ? JSON.stringify(value) : null);
                },
            },
            hyper: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Hyper settings",
                get() {
                    const value = this.getDataValue("hyper");
                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("hyper", value ? JSON.stringify(value) : null);
                },
            },
            avocado: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Avocado settings",
                get() {
                    const value = this.getDataValue("avocado");
                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("avocado", value ? JSON.stringify(value) : null);
                },
            },
            ribbon: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Ribbon display settings",
                get() {
                    const value = this.getDataValue("ribbon");
                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("ribbon", value ? JSON.stringify(value) : null);
                },
            },
            marketplace: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Marketplace configuration",
                get() {
                    const value = this.getDataValue("marketplace");
                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("marketplace", value ? JSON.stringify(value) : null);
                },
            },
            drop_shipping_score: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                defaultValue: 0,
                comment: "Dropshipping performance score"
            },
            drop_shipping_sells: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
                comment: "Dropshipping sales count"
            },
            drop_shipping_products: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
                comment: "Dropshipping product count"
            },
            drop_shipping: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
                comment: "Dropshipping enabled"
            },
            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: "Soft delete timestamp"
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: "Creation timestamp"
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: "Last update timestamp"
            },
            client_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                comment: "Agency client ID reference"
            },
            meta: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Metadata for SEO",
                get() {
                    const value = this.getDataValue("meta");
                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("meta", value ? JSON.stringify(value) : null);
                },
            },
            agency_meta: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Agency metadata",
                get() {
                    const value = this.getDataValue("agency_meta");
                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("agency_meta", value ? JSON.stringify(value) : null);
                },
            },
            translations: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Translations data",
                get() {
                    const value = this.getDataValue("translations");
                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("translations", value ? JSON.stringify(value) : null);
                },
            },
            filters: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Filter configurations",
                get() {
                    const value = this.getDataValue("filters");
                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("filters", value ? JSON.stringify(value) : null);
                },
            },
            engine: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Stores arrays for categories, tags, and limit to load extra products in category",
                get() {
                    const value = this.getDataValue("engine");
                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("engine", value ? JSON.stringify(value) : null);
                },
            },
        },
        {
            sequelize,
            modelName: "Shop",
            tableName: "shops",
            timestamps: true,
            underscored: true,
            paranoid: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: "deleted_at"
        }
    );

    return Shop;
};