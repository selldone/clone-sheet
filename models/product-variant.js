'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ProductVariant extends Model {
        static associate(models) {
            // Define associations
            this.belongsTo(models.Shop, {foreignKey: 'shop_id'});
            this.belongsTo(models.Product, {foreignKey: 'product_id'});
            // this.belongsTo(ProductVariant, { as: 'parent', foreignKey: 'parent_id' });
            // this.hasMany(ProductVariant, { as: 'children', foreignKey: 'parent_id' });
        }
    }

    ProductVariant.init({
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        shop_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        sku: DataTypes.STRING(255),
        mpn: DataTypes.STRING(255),
        gtin: DataTypes.STRING(255),
        color: DataTypes.STRING(32),
        style: DataTypes.STRING(21),
        volume: DataTypes.STRING(21),
        weight: DataTypes.STRING(21),
        pack: DataTypes.STRING(21),
        type: DataTypes.STRING(21),
        pricing: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        price: DataTypes.DOUBLE,
        currency: {
            type: DataTypes.ENUM(
                'SEL', 'NIOC', 'IRR', 'BTC', 'ETH', 'USD', 'EUR', 'ADA', 'GBP', 'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BWP', 'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 'CNY', 'COP', 'CRC', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ETB', 'FJD', 'FKP', 'GEL', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JMD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KRW', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'STD', 'SZL', 'THB', 'TJS', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'UYU', 'UZS', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMW', 'BYN', 'GHS', 'ZWD', 'IQD', 'SYP', 'OMR', 'KWD', 'BTN', 'JOD', 'SOL', 'BHD'
            ),
            allowNull: false
        },
        commission: {
            type: DataTypes.DOUBLE,
            defaultValue: 0
        },
        discount: {
            type: DataTypes.DOUBLE,
            defaultValue: 0
        },
        dis_start: DataTypes.DATE,
        dis_end: DataTypes.DATE,
        price_label: DataTypes.STRING(32),
        quantity: {
            type: DataTypes.DOUBLE.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        image: DataTypes.TEXT,
        enable: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        lead: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: -1
        },
        extra: {
            type: DataTypes.JSON,
            allowNull: true,
            get() {
                const value = this.getDataValue("extra");
                if (typeof value === "object") return value;

                return value ? JSON.parse(value) : null;
            },
            set(value) {
                this.setDataValue("extra", value ? JSON.stringify(value) : null);
            },
        },
        deleted_at: DataTypes.DATE,
        parent_id: DataTypes.BIGINT.UNSIGNED,
        ar: {
            type: DataTypes.JSON,
            allowNull: true,
            get() {
                const value = this.getDataValue("ar");
                if (typeof value === "object") return value;

                return value ? JSON.parse(value) : null;
            },
            set(value) {
                this.setDataValue("ar", value ? JSON.stringify(value) : null);
            },
        },
        meta: {
            type: DataTypes.JSON,
            allowNull: true,
            get() {
                const value = this.getDataValue("meta");
                if (typeof value === "object") return value;

                return value ? JSON.parse(value) : null;
            },
            set(value) {
                this.setDataValue("meta", value ? JSON.stringify(value) : null);
            }
        }
    }, {
        sequelize,
        modelName: 'ProductVariant',
        tableName: 'product_variant',
        timestamps: true,
        paranoid: false,
        underscored: true
    });

    return ProductVariant;
};