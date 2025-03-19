'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('basket_items', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      basket_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'baskets',
          key: 'id'
        }
      },
      product_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      /*  references: {
          model: 'shop_products',
          key: 'id'
        }*/
      },
      variant_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      /*  references: {
          model: 'shop_product_variant',
          key: 'id'
        }*/
      },
      connect_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,

      },
      message: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      preferences: {
        type: Sequelize.JSON,
        allowNull: true
      },
      count: {
        type: Sequelize.DOUBLE.UNSIGNED,
        allowNull: false,
        defaultValue: 1
      },
      count_adjustment: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
        comment: 'Stores the adjustment (positive or negative) applied to the original item count in the basket.'
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      currency: {
        type: Sequelize.ENUM(
            'SEL', 'NIOC', 'IRR', 'BTC', 'ETH', 'USD', 'EUR', 'ADA', 'GBP', 'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BWP', 'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 'CNY', 'COP', 'CRC', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ETB', 'FJD', 'FKP', 'GEL', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JMD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KRW', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'STD', 'SZL', 'THB', 'TJS', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'UYU', 'UZS', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMW', 'BYN', 'GHS', 'ZWD', 'IQD', 'SYP', 'OMR', 'KWD', 'BTN', 'JOD', 'SOL', 'BHD'
        ),
        allowNull: false
      },
      dis: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      offer_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,

      },
      offer_count: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      offer_amount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      cross_dis: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      tax: {
        type: Sequelize.JSON,
        allowNull: true
      },
      check: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      },
      fulfillment_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true
      },
      vendor_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,

      },
      vendor_product_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,

      },
      vendor_price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      extra_pricing_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,

      },
      subscription_price_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,

      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    // Add indexes
    await queryInterface.addIndex('basket_items', ['basket_id']);
    await queryInterface.addIndex('basket_items', ['connect_id']);
    await queryInterface.addIndex('basket_items', ['extra_pricing_id']);
    await queryInterface.addIndex('basket_items', ['product_id']);
    await queryInterface.addIndex('basket_items', ['subscription_price_id']);
    await queryInterface.addIndex('basket_items', ['variant_id']);
    await queryInterface.addIndex('basket_items', ['vendor_id']);
    await queryInterface.addIndex('basket_items', ['vendor_product_id']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('basket_items');
  }
};