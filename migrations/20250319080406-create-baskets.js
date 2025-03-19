'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('baskets', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      label: {
        type: Sequelize.STRING(64),
        charset: 'utf8',
        collate: 'utf8_bin',
        allowNull: true
      },
      shop_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'shops',
          key: 'id'
        }
      },
      user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
      },
      customer_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,

      },
      code: {
        type: Sequelize.STRING(256),
        charset: 'utf8',
        collate: 'utf8_bin',
        allowNull: true
      },
      guest_email: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'Guest Payment Mode (Collect Email!) is enabled only when the guest payment option is activated (Shop > Options > Checkout > Mode = Login-Free).'
      },
      type: {
        type: Sequelize.ENUM('PHYSICAL', 'VIRTUAL', 'SERVICE', 'FILE', 'SUBSCRIPTION'),
        allowNull: false,
        defaultValue: 'PHYSICAL'
      },
      stack: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      },
      status: {
        type: Sequelize.ENUM('Open', 'Reserved', 'Payed', 'Canceled', 'COD'),
        allowNull: false,
        defaultValue: 'Open'
      },
      reject: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      reject_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      receiver_info: {
        type: Sequelize.JSON,
        allowNull: true
      },
      delivery_info: {
        type: Sequelize.JSON,
        allowNull: true
      },
      billing: {
        type: Sequelize.JSON,
        charset: 'utf8mb4',
        collate: 'utf8mb4_bin',
        allowNull: true
      },
      reserved_at: {
        type: Sequelize.DATE,
        allowNull: true
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
      delivery_price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      discount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      tax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      tax_shipping: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      tax_included: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      },
      delivery_state: {
        type: Sequelize.ENUM('CheckQueue', 'OrderConfirm', 'PreparingOrder', 'SentOrder', 'ToCustomer'),
        allowNull: false,
        defaultValue: 'CheckQueue'
      },
      delivery_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      payment_type: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      payment_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true
      },
      session: {
        type: Sequelize.JSON,
        allowNull: true
      },
      channel: {
        type: Sequelize.STRING(32),
        allowNull: true
      },
      discount_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
    
      },
      coupon_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,

      },
      lottery_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,

      },
      link_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true
      },
      affiliate_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
 
      },
      email_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,

      },
      chat: {
        type: Sequelize.JSON,
        allowNull: true
      },
      meta: {
        type: Sequelize.JSON,
        allowNull: true
      },
      form: {
        type: Sequelize.JSON,
        allowNull: true,
        comment: 'Collect custom inputs for the checkout form (e.g., {customer_cpr: ...}). These fields are configured by the seller in Shop -> Options -> Checkout -> Form.'
      },
      subscription_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true
      },
      language: {
        type: Sequelize.STRING(7),
        allowNull: true
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
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
    await queryInterface.addIndex('baskets', ['shop_id']);
    await queryInterface.addIndex('baskets', ['user_id']);
    await queryInterface.addIndex('baskets', ['customer_id']);
    await queryInterface.addIndex('baskets', ['subscription_id']);
    await queryInterface.addIndex('baskets', ['payment_type', 'payment_id']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('baskets');
  }
};