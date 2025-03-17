"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            // A product belongs to a shop
            Product.belongsTo(models.Shop, { foreignKey: "shop_id" });

            // A product belongs to a category
            Product.belongsTo(models.Category, { foreignKey: "category_id" });

            // A product may belong to a vendor
            // Product.belongsTo(models.Vendor, { foreignKey: "vendor_id" });

            // A product may be connected externally
            // Product.belongsTo(models.Connect, { foreignKey: "connect_id" });
        }
    }

    Product.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                comment: "Unique product identifier"
            },
            shop_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                comment: "ID of the shop this product belongs to"
            },
            connect_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                comment: "Connect Service ID"
            },
            vendor_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                comment: "Vendor ID"
            },
            type: {
                type: DataTypes.ENUM("VIRTUAL", "PHYSICAL", "SERVICE", "FILE", "SUBSCRIPTION"),
                allowNull: false,
                comment: "Type of the product"
            },
            order: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
                comment: "Custom order of the product in the listing"
            },
            unit: {
                type: DataTypes.STRING(16),
                allowNull: true,
                comment: "Unit of the product"
            },
            unit_float: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
                comment: "Unit is float or not"
            },
            price_input: {
                type: DataTypes.ENUM("default", "area", "volume", "custom"),
                allowNull: false,
                defaultValue: "default",
                comment: "Price input type"
            },
            valuation_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                comment: "Valuation ID"
            },
            officer: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                comment: "Officer ID - User who added this product"
            },
            pricing: {
                type: DataTypes.ENUM("FIX", "ESTIMATION", "AGREEMENT", "BID"),
                allowNull: false,
                defaultValue: "FIX",
                comment: "Pricing type"
            },
            price: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                comment: "Price of the product"
            },
            currency: {
                type: DataTypes.STRING(8),
                allowNull: false,
                comment: "Currency of the price"
            },
            commission: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                defaultValue: 0,
                comment: "Commission of the product - will be added to the price"
            },
            discount: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                defaultValue: 0,
                comment: "Discount of the product"
            },
            dis_start: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: "Discount start date"
            },
            dis_end: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: "Discount end date"
            },
            price_label: {
                type: DataTypes.STRING(32),
                allowNull: true,
                comment: "Price label"
            },
            status: {
                type: DataTypes.ENUM("Open", "Close", "Pending", "Rejected", "Unlisted"),
                allowNull: false,
                defaultValue: "Open",
                comment: "Status of the product"
            },
            title: {
                type: DataTypes.STRING(255),
                allowNull: false,
                comment: "Title of the product"
            },
            title_en: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Title of the product in English"
            },
            sku: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: "Stock Keeping Unit"
            },
            mpn: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: "Manufacturer Part Number"
            },
            gtin: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: "Global Trade Item Number"
            },
            gpc: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: true,
                comment: "Global Product Classification"
            },
            hsn: {
                type: DataTypes.STRING(16),
                allowNull: true,
                comment: "Harmonized System Nomenclature"
            },
            condition: {
                type: DataTypes.ENUM("new", "refurbished", "used", "used_fair", "used_good", "used_like_new"),
                allowNull: false,
                defaultValue: "new",
                comment: "Condition of the product"
            },
            brand: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: "Brand of the product"
            },
            warranty: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: "Warranty of the product"
            },
            spec: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
                comment: "Specification of the product",
                get() {
                    const value = this.getDataValue("spec");
                    if (typeof value === "object") return value;

                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("spec", value ? JSON.stringify(value) : null);
                },
            },
            spec_order: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
                comment: "Specification order",
                get() {
                    const value = this.getDataValue("spec_order");
                    if (typeof value === "object") return value;

                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("spec_order", value ? JSON.stringify(value) : null);
                },
            },
            pros: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
                comment: "Pros of the product",
                get() {
                    const value = this.getDataValue("pros");
                    if (typeof value === "object") return value;

                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("pros", value ? JSON.stringify(value) : null);
                },
            },
            cons: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
                comment: "Cons of the product",
                get() {
                    const value = this.getDataValue("cons");
                    if (typeof value === "object") return value;

                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("cons", value ? JSON.stringify(value) : null);
                },
            },
            icon: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Icon path of the product"
            },
            cover: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Cover image path for the product"
            },
            message: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Message of the product to show in the custom form"
            },
            outputs: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Outputs form structure of the product",
                get() {
                    const value = this.getDataValue("outputs");
                    if (typeof value === "object") return value;

                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("outputs", value ? JSON.stringify(value) : null);
                },
            },
            inputs: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Inputs form structure of the product",
                get() {
                    const value = this.getDataValue("inputs");
                    if (typeof value === "object") return value;

                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("inputs", value ? JSON.stringify(value) : null);
                },
            },
            variants: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "An abstracted variants of the product",
                get() {
                    const value = this.getDataValue("variants");
                    if (typeof value === "object") return value;

                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("variants", value ? JSON.stringify(value) : null);
                },
            },
            blog: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "External link to more resources about the product"
            },
            category_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: true,
                comment: "Category ID"
            },
            shortcuts: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Array of category ids for shortcut listing",
                get() {
                    const value = this.getDataValue("shortcuts");
                    if (typeof value === "object") return value;

                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("shortcuts", value ? JSON.stringify(value) : null);
                },
            },
            quantity: {
                type: DataTypes.DOUBLE.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
                comment: "Quantity of the product"
            },
            limit_min: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
                comment: "Minimum order quantity (0 for no limit)"
            },
            limit_max: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
                comment: "Maximum order quantity (0 for no limit)"
            },
            lead: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: -1,
                comment: "Lead time in hours"
            },
            extra: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Extra product information",
                get() {
                    const value = this.getDataValue("extra");
                    if (typeof value === "object") return value;

                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("extra", value ? JSON.stringify(value) : null);
                },
            },
            style: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Custom styling information",
                get() {
                    const value = this.getDataValue("style");
                    if (typeof value === "object") return value;

                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("style", value ? JSON.stringify(value) : null);
                },
            },
            visits: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                comment: "Number of product page visits"
            },
            rate: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                defaultValue: 0,
                comment: "Average rating of the product"
            },
            rate_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                comment: "Number of ratings"
            },
            for_available: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                comment: "Available status indicator"
            },
            for_auction: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                comment: "Auction status indicator"
            },
            sells: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                comment: "Number of times the product has been sold"
            },
            return_warranty: {
                type: DataTypes.TINYINT.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
                comment: "Return warranty flag"
            },
            original: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0,
                comment: "Whether the product is original or not"
            },
            best_seller: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0,
                comment: "Whether the product is a best seller"
            },
            best_content: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0,
                comment: "Whether the product has the best content"
            },
            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: "Soft delete timestamp"
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: DataTypes.NOW,
                comment: "Creation timestamp"
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: DataTypes.NOW,
                comment: "Last update timestamp"
            },
            slug: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: "URL-friendly version of the title"
            },
            video: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: "URL to the product video"
            },
            ar: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "3D model & AR data",
                get() {
                    const value = this.getDataValue("ar");
                    if (typeof value === "object") return value;

                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("ar", value ? JSON.stringify(value) : null);
                },
            },
            note: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Additional notes",
                get() {
                    const value = this.getDataValue("note");
                    if (typeof value === "object") return value;

                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("note", value ? JSON.stringify(value) : null);
                },
            },
            badges: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Product badges",
                get() {
                    const value = this.getDataValue("badges");
                    if (typeof value === "object") return value;

                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("badges", value ? JSON.stringify(value) : null);
                },
            },
            repository_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                comment: "Repository ID reference"
            },
            reselling: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0,
                comment: "Is for drop-shipping"
            },
            parent_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: true,
                comment: "Parent product ID for variants"
            },
            shipping: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Drop-shipping (Shipping cost) Country code -> shipping",
                get() {
                    const value = this.getDataValue("shipping");
                    if (typeof value === "object") return value;

                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("shipping", value ? JSON.stringify(value) : null);
                },
            },
            reselling_shops: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
                comment: "Count of reselling shops"
            },
            reselling_count: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
                comment: "Count of reselling instances"
            },
            warranty_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                comment: "Warranty profile ID"
            },
            return_policy_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                comment: "Return policy profile ID"
            },
            guide_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                comment: "Guide profile ID"
            },
            shipping_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                comment: "Shipping profile ID"
            },
            tax_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                comment: "Tax profile ID"
            },
            map_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                comment: "Map tag ID"
            },
            tags: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Product tags",
                get() {
                    const value = this.getDataValue("tags");
                    if (typeof value === "object") return value;

                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("tags", value ? JSON.stringify(value) : null);
                },
            },
            ribbon: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Ribbon display information",
                get() {
                    const value = this.getDataValue("ribbon");
                    if (typeof value === "object") return value;

                    if (typeof value === "object") return value;

                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("ribbon", value ? JSON.stringify(value) : null);
                },
            },
            meta: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Meta information for SEO",
                get() {
                    const value = this.getDataValue("meta");
                    if (typeof value === "object") return value;

                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("meta", value ? JSON.stringify(value) : null);
                },
            },
            audit: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Audit information",
                get() {
                    const value = this.getDataValue("audit");
                    if (typeof value === "object") return value;

                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("audit", value ? JSON.stringify(value) : null);
                },
            },
            audit_at: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: "Audit timestamp"
            },
            action: {
                type: DataTypes.STRING(120),
                allowNull: true,
                comment: "Action identifier"
            },
            external: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: "External reference"
            },
            theme: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: "Theme reference"
            },
            augment: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Augmentation data",
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
                comment: "Page ID reference"
            },
            locations: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Location data",
                get() {
                    const value = this.getDataValue("locations");
                    if (typeof value === "object") return value;

                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("locations", value ? JSON.stringify(value) : null);
                },
            },
            thresholds: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Threshold information",
                get() {
                    const value = this.getDataValue("thresholds");
                    if (typeof value === "object") return value;

                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("thresholds", value ? JSON.stringify(value) : null);
                },
            },
            cluster_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                comment: "Cluster ID reference"
            },
            translations: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Translation data",
                get() {
                    const value = this.getDataValue("translations");
                    if (typeof value === "object") return value;

                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("translations", value ? JSON.stringify(value) : null);
                },
            },
            attributes: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Product attributes",
                get() {
                    const value = this.getDataValue("attributes");
                    if (typeof value === "object") return value;

                    return value ? JSON.parse(value) : null;
                },
                set(value) {
                    this.setDataValue("attributes", value ? JSON.stringify(value) : null);
                },
            },
            property_set_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                comment: "Property set ID reference"
            }
        },
        {
            sequelize,
            modelName: "Product",
            tableName: "products",
            timestamps: true,
            underscored: true,
            paranoid: false, // Enables soft delete functionality
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: "deleted_at"
        }
    );

    return Product;
};