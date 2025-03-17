"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("customers", {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        comment: "Unique identifier for the shop customer",
      },
      shop_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        comment: "ID of the shop this customer belongs to",
      },
      user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        comment: "Optional user ID associated with the customer",
      },
      source: {
        type: Sequelize.ENUM("customer", "vendor"),
        allowNull: false,
        defaultValue: "customer",
        comment: "Identifies if the record is a customer or a vendor",
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "Customer's name",
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "Customer's email address",
      },
      phone: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "Customer's phone number",
      },
      segments: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
        comment: "Customer segments in JSON format",
      },
      address: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
        comment: "Customer address in JSON format",
      },
      billing: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
        comment: "Customer billing info in JSON format",
      },
      level: {
        type: Sequelize.ENUM("BRONZE", "SILVER", "GOLD", "PLATINUM", "DIAMOND"),
        allowNull: true,
        comment: "Customer level",
      },
      subscribed: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 1,
        comment: "Subscription status (1 = subscribed)",
      },
      currency: {
        type: Sequelize.ENUM(
            'SEL', 'NIOC', 'IRR', 'BTC', 'ETH', 'USD', 'EUR', 'ADA', 'GBP', 'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BWP', 'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 'CNY', 'COP', 'CRC', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ETB', 'FJD', 'FKP', 'GEL', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JMD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KRW', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'STD', 'SZL', 'THB', 'TJS', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'UYU', 'UZS', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMW', 'BYN', 'GHS', 'ZWD', 'IQD', 'SYP', 'OMR', 'KWD', 'BTN', 'JOD', 'SOL', 'BHD'
        ),
        allowNull: false,
        comment: "Currency code for the customer",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: "Timestamp when the record was created",
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: "Timestamp when the record was last updated",
      },
      login_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: "Last login timestamp",
      },
      purchase_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: "Last purchase timestamp",
      },
      chips: {
        type: Sequelize.INTEGER(8).UNSIGNED,
        allowNull: false,
        comment: "Chip balance or points",
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: "Customer's birthday",
      },
      sex: {
        type: Sequelize.ENUM("Male", "Female"),
        allowNull: true,
        comment: "Customer's sex",
      },
      access: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
        comment: "Access flag (0 = no access, 1 = has access)",
      },
      banned: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
        comment: "Ban flag (0 = not banned, 1 = banned)",
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Additional notes",
      },
      meta: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
        comment: "Meta information stored in JSON",
      },
      country: {
        type: Sequelize.STRING(2),
        allowNull: true,
        comment: "Country code (ISO 3166-1 alpha-2)",
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: "Timestamp for soft deletion",
      },
    }, {
      collate: "utf8mb4_unicode_ci",
    });



    // Add foreign key constraints
    await queryInterface.addConstraint("customers", {
      fields: ["shop_id"],
      type: "foreign key",
      references: {
        table: "shops",
        field: "id",
      },
      onDelete: "CASCADE",
    });


    // Add indexes for performance
    await queryInterface.addIndex("customers", ["shop_id"]);
    await queryInterface.addIndex("customers", ["user_id"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("customers");
  },
};
