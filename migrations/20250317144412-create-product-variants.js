'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First create the table without the self-referencing constraint
    await queryInterface.createTable('product_variant', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      shop_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'shops',
          key: 'id'
        }
      },
      product_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id'
        }
      },
      sku: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      mpn: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      gtin: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      color: {
        type: Sequelize.STRING(32),
        allowNull: true
      },
      style: {
        type: Sequelize.STRING(21),
        allowNull: true
      },
      volume: {
        type: Sequelize.STRING(21),
        allowNull: true
      },
      weight: {
        type: Sequelize.STRING(21),
        allowNull: true
      },
      pack: {
        type: Sequelize.STRING(21),
        allowNull: true
      },
      type: {
        type: Sequelize.STRING(21),
        allowNull: true
      },
      pricing: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      currency: {
        type: Sequelize.ENUM(
            'SEL', 'NIOC', 'IRR', 'BTC', 'ETH', 'USD', 'EUR', 'ADA', 'GBP', 'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BWP', 'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 'CNY', 'COP', 'CRC', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ETB', 'FJD', 'FKP', 'GEL', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JMD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KRW', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'STD', 'SZL', 'THB', 'TJS', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'UYU', 'UZS', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMW', 'BYN', 'GHS', 'ZWD', 'IQD', 'SYP', 'OMR', 'KWD', 'BTN', 'JOD', 'SOL', 'BHD'
        ),
        allowNull: false
      },
      commission: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
        allowNull: true
      },
      discount: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
        allowNull: true
      },
      dis_start: {
        type: Sequelize.DATE,
        allowNull: true
      },
      dis_end: {
        type: Sequelize.DATE,
        allowNull: true
      },
      price_label: {
        type: Sequelize.STRING(32),
        allowNull: true
      },
      quantity: {
        type: Sequelize.DOUBLE.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      },
      image: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      enable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 1
      },
      lead: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: -1
      },
      extra: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      parent_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true
      },
      ar: {
        type: Sequelize.JSON,
        allowNull: true
      },
      meta: {
        type: Sequelize.JSON,
        allowNull: true
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });


    // Add indexes
    await queryInterface.addIndex('product_variant', ['shop_id']);
    await queryInterface.addIndex('product_variant', ['product_id']);
    await queryInterface.addIndex('product_variant', ['sku']);
    await queryInterface.addIndex('product_variant', ['parent_id']);
    await queryInterface.addIndex('product_variant', ['enable']);
    await queryInterface.addIndex('product_variant', ['deleted_at']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('product_variant');
  }
};