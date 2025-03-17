"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      email_verified_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      socials_login: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      preferences: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      interest: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      subscribed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      block_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      block_hours: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      ban: {
        type: Sequelize.ENUM("TRANSACTION_BAN", "SHOP_ADMIN_BAN", "SHOP_CUSTOMER_BAN", "FULL_BAN"),
        allowNull: true,
      },
      meta: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
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
      verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      source: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },

    });


  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
