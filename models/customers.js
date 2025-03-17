"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        static associate(models) {
            // A Customer belongs to a Shop.
            Customer.belongsTo(models.Shop, {foreignKey: "shop_id"});
            // Optionally, a Customer may belong to a User.
            Customer.belongsTo(models.User, {foreignKey: "user_id"});
        }
    }

    Customer.init(
        {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                comment: "Unique identifier for the shop customer",
            },
            shop_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                comment: "ID of the shop this customer belongs to",
            },
            user_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: true,
                comment: "Optional user ID associated with the customer",
            },
            source: {
                type: DataTypes.ENUM("customer", "vendor"),
                allowNull: false,
                defaultValue: "customer",
                comment: "Identifies if the record is a customer or a vendor",
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: "Customer's name",
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: "Customer's email address",
            },
            phone: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: "Customer's phone number",
            },
            segments: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
                comment: "Customer segments in JSON format",
                get() {
                    const value = this.getDataValue("segments");
                    try {
                        return value ? JSON.parse(value) : null;
                    } catch (e) {
                        return value;
                    }
                },
                set(val) {
                    this.setDataValue("segments", val ? JSON.stringify(val) : null);
                },
            },
            address: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
                comment: "Customer address in JSON format",
                get() {
                    const value = this.getDataValue("address");
                    try {
                        return value ? JSON.parse(value) : null;
                    } catch (e) {
                        return value;
                    }
                },
                set(val) {
                    this.setDataValue("address", val ? JSON.stringify(val) : null);
                },
            },
            billing: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
                comment: "Customer billing info in JSON format",
                get() {
                    const value = this.getDataValue("billing");
                    try {
                        return value ? JSON.parse(value) : null;
                    } catch (e) {
                        return value;
                    }
                },
                set(val) {
                    this.setDataValue("billing", val ? JSON.stringify(val) : null);
                },
            },
            level: {
                type: DataTypes.ENUM("BRONZE", "SILVER", "GOLD", "PLATINUM", "DIAMOND"),
                allowNull: true,
                comment: "Customer level",
            },
            subscribed: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
                comment: "Subscription status",
            },
            currency: {
                type: DataTypes.ENUM(
                    'SEL', 'NIOC', 'IRR', 'BTC', 'ETH', 'USD', 'EUR', 'ADA', 'GBP', 'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BWP', 'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 'CNY', 'COP', 'CRC', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ETB', 'FJD', 'FKP', 'GEL', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JMD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KRW', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'STD', 'SZL', 'THB', 'TJS', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'UYU', 'UZS', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMW', 'BYN', 'GHS', 'ZWD', 'IQD', 'SYP', 'OMR', 'KWD', 'BTN', 'JOD', 'SOL', 'BHD'
                ),
                allowNull: false,
                comment: "Currency code for the customer",
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: "Creation timestamp",
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: "Last update timestamp",
            },
            login_at: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: "Last login timestamp",
            },
            purchase_at: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: "Last purchase timestamp",
            },
            chips: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                comment: "Chip balance",
            },
            birthday: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: "Customer birthday",
            },
            sex: {
                type: DataTypes.ENUM("Male", "Female"),
                allowNull: true,
                comment: "Customer's sex",
            },
            access: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
                comment: "Access flag (0 = no access, 1 = has access)",
            },
            banned: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
                comment: "Ban flag (0 = not banned, 1 = banned)",
            },
            notes: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "Additional notes",
            },
            meta: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
                comment: "Meta information in JSON",
                get() {
                    const value = this.getDataValue("meta");
                    try {
                        return value ? JSON.parse(value) : null;
                    } catch (e) {
                        return value;
                    }
                },
                set(val) {
                    this.setDataValue("meta", val ? JSON.stringify(val) : null);
                },
            },
            country: {
                type: DataTypes.STRING(2),
                allowNull: true,
                comment: "Country code (ISO 3166-1 alpha-2)",
            },
            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: "Soft delete timestamp",
            },
        },
        {
            sequelize,
            modelName: "Customer",
            tableName: "customers",
            timestamps: true,
            underscored: true,
            paranoid: false, // Enables soft deletion via the deleted_at column
        }
    );

    return Customer;
};
