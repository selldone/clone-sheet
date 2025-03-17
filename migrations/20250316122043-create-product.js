"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("products", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique product identifier"
      },


      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "Title of the product"
      },
      type: {
        type: Sequelize.ENUM("VIRTUAL", "PHYSICAL", "SERVICE", "FILE", "SUBSCRIPTION"),
        allowNull: false,
        comment: "Type of the product"
      },


      title_en: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Title of the product in English"
      },
      sku: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "Stock Keeping Unit"
      },
      mpn: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "Manufacturer Part Number"
      },

      status: {
        type: Sequelize.ENUM("Open", "Close", "Pending", "Rejected", "Unlisted"),
        allowNull: false,
        defaultValue: "Open",
        comment: "Status of the product"
      },

      quantity: {
        type: Sequelize.DOUBLE.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: "Quantity of the product"
      },


      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        comment: "Price of the product"
      },
      currency: {
        type: Sequelize.ENUM(
            'SEL', 'NIOC', 'IRR', 'BTC', 'ETH', 'USD', 'EUR', 'ADA', 'GBP', 'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BWP', 'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 'CNY', 'COP', 'CRC', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ETB', 'FJD', 'FKP', 'GEL', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JMD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KRW', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'STD', 'SZL', 'THB', 'TJS', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'UYU', 'UZS', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMW', 'BYN', 'GHS', 'ZWD', 'IQD', 'SYP', 'OMR', 'KWD', 'BTN', 'JOD', 'SOL', 'BHD'
        ),
        allowNull: false,
        comment: "Currency of the price"
      },
      commission: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
        comment: "Commission of the product - will be added to the price"
      },
      discount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
        comment: "Discount of the product"
      },
      dis_start: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: "Discount start date"
      },
      dis_end: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: "Discount end date"
      },



      unit: {
        type: Sequelize.STRING(16),
        allowNull: true,
        comment: "Unit of the product"
      },
      unit_float: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "Unit is float or not"
      },



      price_input: {
        type: Sequelize.ENUM("default", "area", "volume", "custom"),
        allowNull: false,
        defaultValue: "default",
        comment: "Price input type"
      },


      price_label: {
        type: Sequelize.STRING(32),
        allowNull: true,
        comment: "Price label"
      },

      valuation_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        comment: "Valuation ID"
      },



      pricing: {
        type: Sequelize.ENUM("FIX", "ESTIMATION", "AGREEMENT", "BID"),
        allowNull: false,
        defaultValue: "FIX",
        comment: "Pricing type"
      },



      gtin: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "Global Trade Item Number"
      },
      gpc: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        comment: "Global Product Classification"
      },
      hsn: {
        type: Sequelize.STRING(16),
        allowNull: true,
        comment: "Harmonized System Nomenclature"
      },
      condition: {
        type: Sequelize.ENUM("new", "refurbished", "used", "used_fair", "used_good", "used_like_new"),
        allowNull: false,
        defaultValue: "new",
        comment: "Condition of the product"
      },
      brand: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "Brand of the product"
      },
      warranty: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "Warranty of the product"
      },
      spec: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
        comment: "Specification of the product"
      },
      spec_order: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
        comment: "Specification order"
      },
      pros: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
        comment: "Pros of the product"
      },
      cons: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
        comment: "Cons of the product"
      },
      icon: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Icon path of the product"
      },
      cover:{
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Cover image path of the product"
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Message of the product to show in the custom form"
      },
      outputs: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Outputs form structure of the product"
      },
      inputs: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Inputs form structure of the product"
      },
      variants: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "An abstracted variants of the product"
      },
      blog: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "External link to more resources about the product"
      },
      category_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        comment: "Category ID"
      },
      shortcuts: {
        type: Sequelize.JSON,
        allowNull: true,
        comment: "Array of category ids for shortcut listing"
      },

      limit_min: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: "Minimum order quantity (0 for no limit)"
      },
      limit_max: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: "Maximum order quantity (0 for no limit)"
      },
      lead: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: -1,
        comment: "Lead time in hours"
      },
      extra: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      style: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      visits: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      rate: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      rate_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      for_available: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      for_auction: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      sells: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      return_warranty: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      original: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      best_seller: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      best_content: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },

      slug: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      video: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      ar: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      note: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      badges: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      repository_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      },
      reselling: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      parent_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
      },
      shipping: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      reselling_shops: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      reselling_count: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      warranty_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      },
      return_policy_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      },
      guide_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      },
      shipping_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      },
      tax_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      },
      map_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      },
      tags: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      ribbon: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      meta: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      audit: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      audit_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      action: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },
      external: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      theme: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      augment: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      page_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
      },
      locations: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      thresholds: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      cluster_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      },
      translations: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      attributes: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      property_set_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      },

      order: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: "Custom order of the product in the listing."
      },

      // Other relations
      shop_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        comment: "ID of the shop this product belongs to"
      },
      connect_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        comment: "Connect Service ID"
      },
      vendor_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        comment: "Vendor ID"
      },

      officer: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        comment: "Officer ID - User who added this product"
      },


      // Dates:
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      },


    });

    // Add foreign keys
    await queryInterface.addConstraint("products", {
      fields: ["shop_id"],
      type: "foreign key",
      references: {
        table: "shops",
        field: "id",
      },
      onDelete: "CASCADE",
    });

    await queryInterface.addConstraint("products", {
      fields: ["category_id"],
      type: "foreign key",
      references: {
        table: "categories",
        field: "id",
      },
      onDelete: "SET NULL",
    });



    // Add indexes
    await queryInterface.addIndex("products", ["shop_id"]);
    await queryInterface.addIndex("products", ["category_id"]);
    await queryInterface.addIndex("products", ["connect_id"]);
    await queryInterface.addIndex("products", ["vendor_id"]);
    await queryInterface.addIndex("products", ["parent_id"]);
    await queryInterface.addIndex("products", ["repository_id"]);
    await queryInterface.addIndex("products", ["page_id"]);
    await queryInterface.addIndex("products", ["cluster_id"]);
    await queryInterface.addIndex("products", ["property_set_id"]);
    await queryInterface.addIndex("products", ["warranty_id"]);
    await queryInterface.addIndex("products", ["return_policy_id"]);
    await queryInterface.addIndex("products", ["guide_id"]);
    await queryInterface.addIndex("products", ["shipping_id"]);
    await queryInterface.addIndex("products", ["tax_id"]);
    await queryInterface.addIndex("products", ["map_id"]);
    await queryInterface.addIndex("products", ["valuation_id"]);
    await queryInterface.addIndex("products", ["officer"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("products");
  },
};