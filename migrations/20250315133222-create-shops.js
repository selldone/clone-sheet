"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("shops", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        comment: "User ID who owns this shop"
      },
      model: {
        type: Sequelize.ENUM("normal", "wholesaler", "marketplace", "franchise", "dropshipping"),
        allowNull: false,
        defaultValue: "normal",
        comment: "Shop business model"
      },
      name: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique: true,
        comment: "Unique shop name/identifier"
      },
      home: {
        type: Sequelize.STRING(20),
        allowNull: true,
        comment: "Home page identifier"
      },
      language: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "Default language"
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "Shop display title"
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Shop description"
      },
      icon: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Shop icon path"
      },
      fav: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "Favicon path"
      },
      official: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "Shop is officially verified"
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "Shop is active/open"
      },
      restriction: {
        type: Sequelize.ENUM("PUBLIC", "PRIVATE", "RESTRICTED"),
        allowNull: false,
        defaultValue: "PUBLIC",
        comment: "Shop access restriction level"
      },
      license: {
        type: Sequelize.ENUM("FREE", "STARTUP", "COMPANY", "ENTERPRISE"),
        allowNull: false,
        defaultValue: "FREE",
        comment: "Shop license type"
      },
      domain: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "Custom domain for shop"
      },
      capacity: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
        comment: "Storage capacity"
      },
      expire_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: "License expiration date"
      },
      info: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Additional shop information"
      },
      support_mode: {
        type: Sequelize.ENUM("24h7d", "normal", "none"),
        allowNull: false,
        defaultValue: "normal",
        comment: "Support mode for shop"
      },
      support: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
        comment: "Support details"
      },
      address_verified: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "Verified address"
      },
      phone_verified: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "Verified phone number"
      },
      gold: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: "Gold status level"
      },
      options: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
        comment: "Shop options"
      },
      penalty: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: "Penalty points"
      },
      purge_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: "Scheduled purge date"
      },
      currencies: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Available currencies"
      },
      footer: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Footer content"
      },
      // Added missing fields
      local: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Local settings"
      },
      sub: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Subscription details"
      },
      countries: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Supported countries"
      },
      lottery: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Lottery configuration"
      },
      tax: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Tax settings"
      },
      layout_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        comment: "Layout reference ID"
      },
      layout_version: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "Layout version"
      },
      theme: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
        comment: "Theme configuration"
      },
      hyper: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Hyper settings"
      },
      avocado: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Avocado settings"
      },
      ribbon: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Ribbon display settings"
      },
      marketplace: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Marketplace configuration"
      },
      drop_shipping_score: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
        comment: "Dropshipping performance score"
      },
      drop_shipping_sells: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: "Dropshipping sales count"
      },
      drop_shipping_products: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: "Dropshipping product count"
      },
      drop_shipping: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "Dropshipping enabled"
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: "Soft delete timestamp"
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "Creation timestamp"
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
        comment: "Last update timestamp"
      },
      client_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        comment: "Agency client ID reference"
      },
      meta: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Metadata for SEO"
      },
      agency_meta: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Agency metadata"
      },
      translations: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Translations data"
      },
      filters: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Filter configurations"
      },
      engine: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Stores arrays for categories, tags, and limit to load extra products in category"
      }
    });

    // Add foreign keys
    await queryInterface.addConstraint("shops", {
      fields: ["user_id"],
      type: "foreign key",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "CASCADE"
    });


    // Add indexes
    await queryInterface.addIndex("shops", ["user_id"]);
    await queryInterface.addIndex("shops", ["layout_id"]);
    await queryInterface.addIndex("shops", ["client_id"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("shops");
  },
};