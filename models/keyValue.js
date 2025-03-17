"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class KeyValue extends Model {
        static associate(models) {
            // No direct associations needed for key-value storage.
        }
    }

    KeyValue.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            key: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },
            value: {
                type: DataTypes.TEXT("long"),
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
        },
        {
            sequelize,
            modelName: "KeyValue",
            timestamps: true,
            underscored: true,
            paranoid: false,
        }
    );

    return KeyValue;
};
