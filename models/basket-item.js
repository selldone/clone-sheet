'use strict';

module.exports = (sequelize, DataTypes) => {
    const BasketItem = sequelize.define('BasketItem', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        basket_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        variant_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true
        },
        connect_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        preferences: {
            type: DataTypes.JSON,
            allowNull: true
        },
        count: {
            type: DataTypes.DOUBLE.UNSIGNED,
            allowNull: false,
            defaultValue: 1
        },
        count_adjustment: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0,
            comment: 'Stores the adjustment (positive or negative) applied to the original item count in the basket.'
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        currency: {
            type: DataTypes.ENUM(
                'SEL', 'NIOC', 'IRR', 'BTC', 'ETH', 'USD', 'EUR', 'ADA', 'GBP', 'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BWP', 'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 'CNY', 'COP', 'CRC', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ETB', 'FJD', 'FKP', 'GEL', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JMD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KRW', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'STD', 'SZL', 'THB', 'TJS', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'UYU', 'UZS', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMW', 'BYN', 'GHS', 'ZWD', 'IQD', 'SYP', 'OMR', 'KWD', 'BTN', 'JOD', 'SOL', 'BHD'
            ),
            allowNull: false
        },
        dis: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        offer_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true
        },
        offer_count: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        offer_amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        cross_dis: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        tax: {
            type: DataTypes.JSON,
            allowNull: true
        },
        check: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        fulfillment_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true
        },
        vendor_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true
        },
        vendor_product_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true
        },
        vendor_price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        extra_pricing_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true
        },
        subscription_price_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true
        }
    }, {
        tableName: 'basket_items',
        underscored: true,
        timestamps: true
    });

    BasketItem.associate = function(models) {
        // Define associations
        BasketItem.belongsTo(models.Basket, {
            foreignKey: 'basket_id',
            as: 'basket'
        });

        BasketItem.belongsTo(models.Product, {
            foreignKey: 'product_id',
            as: 'product'
        });

        BasketItem.belongsTo(models.ProductVariant, {
            foreignKey: 'variant_id',
            as: 'variant'
        });

        BasketItem.belongsTo(models.Connect, {
            foreignKey: 'connect_id',
            as: 'connect',
            onDelete: 'SET NULL'
        });

        BasketItem.belongsTo(models.Offer, {
            foreignKey: 'offer_id',
            as: 'offer'
        });

        BasketItem.belongsTo(models.Vendor, {
            foreignKey: 'vendor_id',
            as: 'vendor',
            onDelete: 'SET NULL'
        });

        BasketItem.belongsTo(models.VendorProduct, {
            foreignKey: 'vendor_product_id',
            as: 'vendorProduct',
            onDelete: 'SET NULL'
        });

        BasketItem.belongsTo(models.ExtraPricing, {
            foreignKey: 'extra_pricing_id',
            as: 'extraPricing',
            onDelete: 'SET NULL'
        });

        BasketItem.belongsTo(models.SubscriptionPrice, {
            foreignKey: 'subscription_price_id',
            as: 'subscriptionPrice',
            onDelete: 'SET NULL'
        });
    };

    return BasketItem;
};