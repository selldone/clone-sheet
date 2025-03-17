"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // Define associations
            User.hasMany(models.Shop, { foreignKey: "user_id" }); // A user can own multiple shops
        }
    }

    User.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
            },
            phone: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            email_verified_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            socials_login: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            preferences: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
            },
            interest: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
            },
            subscribed: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            block_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            block_hours: {
                type: DataTypes.TINYINT.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
            ban: {
                type: DataTypes.ENUM("TRANSACTION_BAN", "SHOP_ADMIN_BAN", "SHOP_CUSTOMER_BAN", "FULL_BAN"),
                allowNull: true,
            },
            meta: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
            },
            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            remember_token: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: DataTypes.NOW,
            },
            verified: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            source: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
            },

        },
        {
            sequelize,
            modelName: "User",
            timestamps: true,
            underscored: true,
            paranoid: false, // Enables soft delete functionality
        }
    );

    return User;
};
