"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("categories", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(32),
        allowNull: true,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      icon: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      star: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      order: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },


      visits: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      products: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      categories: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      filters: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      note: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },

      theme: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      augment: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      page_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
      },
      cluster_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      },
      translations: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      engine: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },

      // Other relations:
      shop_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      parent_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
      },
      connect_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      },
      vendor_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
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
    await queryInterface.addConstraint("categories", {
      fields: ["shop_id"],
      type: "foreign key",
      references: {
        table: "shops",
        field: "id",
      },
      onDelete: "CASCADE",
    });




    await queryInterface.addIndex("categories", ["shop_id"]);
    await queryInterface.addIndex("categories", ["parent_id"]);
    await queryInterface.addIndex("categories", ["connect_id"]);
    await queryInterface.addIndex("categories", ["vendor_id"]);
    await queryInterface.addIndex("categories", ["page_id"]);
    await queryInterface.addIndex("categories", ["cluster_id"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("categories");
  },
};
