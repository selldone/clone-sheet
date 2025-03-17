// migrations/YYYYMMDDHHMMSS-create-shop-data.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('shop_data', {
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
      // Virtual product stats
      total_products_virtual: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      sell_products_virtual: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      send_products_virtual: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      view_products_virtual: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },

      // Physical product stats
      total_products_physical: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      sell_products_physical: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      send_products_physical: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      view_products_physical: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },

      // File product stats
      total_products_file: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      sell_products_file: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      send_products_file: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      view_products_file: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },

      // Service product stats
      total_products_service: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      sell_products_service: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      send_products_service: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      view_products_service: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },

      // Subscription product stats
      total_products_subscription: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      sell_products_subscription: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      send_products_subscription: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      view_products_subscription: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },

      // Avocado stats
      view_avocados: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      request_avocados: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      sell_avocados: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },

      // Hyper stats
      hyper_views: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      hyper_new_carts: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      hyper_checkouts: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      hyper_pays: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      hyper_rejects: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },

      // General engagement stats
      views: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      amp: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      likes: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      powers: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      favorites: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      comments: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      comments_approved: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      ratings: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      wishlist: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },

      // User stats
      users: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      users_add: { type: Sequelize.INTEGER, defaultValue: 0, allowNull: false },
      social: {
        type: Sequelize.TEXT,
        allowNull: true,
        collate: 'utf8mb4_bin'
      },

      // Content stats
      products_add: { type: Sequelize.BIGINT.UNSIGNED, defaultValue: 0, allowNull: false },
      products_remove: { type: Sequelize.BIGINT.UNSIGNED, defaultValue: 0, allowNull: false },
      categories_add: { type: Sequelize.BIGINT.UNSIGNED, defaultValue: 0, allowNull: false },
      categories_remove: { type: Sequelize.BIGINT.UNSIGNED, defaultValue: 0, allowNull: false },
      customers_add: { type: Sequelize.BIGINT.UNSIGNED, defaultValue: 0, allowNull: false },
      customers_remove: { type: Sequelize.BIGINT.UNSIGNED, defaultValue: 0, allowNull: false },
      pages_add: { type: Sequelize.BIGINT.UNSIGNED, defaultValue: 0, allowNull: false },
      pages_remove: { type: Sequelize.BIGINT.UNSIGNED, defaultValue: 0, allowNull: false },

      // Visitor stats
      new_visitors: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },
      returning_visitors: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },
      page_views: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },

      // Order stats
      order_physical_added: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },
      order_physical_checkout: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },
      order_virtual_added: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },
      order_virtual_checkout: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },
      order_file_added: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },
      order_file_checkout: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },
      order_service_added: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },
      order_service_checkout: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },
      order_subscription_added: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },
      order_subscription_checkout: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },

      // Delivery service stats
      ds_count: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },
      ds_payments: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },
      ds_confirms: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },
      ds_sends: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },
      ds_deliveries: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },
      ds_cancels: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },
      ds_rejects: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false },

      // Timestamps
      created_at: { type: Sequelize.DATE, allowNull: true },
      updated_at: { type: Sequelize.DATE, allowNull: true }
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    });

    await queryInterface.addIndex('shop_data', ['shop_id']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('shop_data');
  }
};