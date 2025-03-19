'use strict';

module.exports = (sequelize, DataTypes) => {
    const Basket = sequelize.define('Basket', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        label: {
            type: DataTypes.STRING(64),
            charset: 'utf8',
            collate: 'utf8_bin',
            allowNull: true
        },
        shop_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        customer_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true
        },
        code: {
            type: DataTypes.STRING(256),
            charset: 'utf8',
            collate: 'utf8_bin',
            allowNull: true
        },
        guest_email: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'Guest Payment Mode (Collect Email!) is enabled only when the guest payment option is activated (Shop > Options > Checkout > Mode = Login-Free).'
        },
        type: {
            type: DataTypes.ENUM('PHYSICAL', 'VIRTUAL', 'SERVICE', 'FILE', 'SUBSCRIPTION'),
            allowNull: false,
            defaultValue: 'PHYSICAL'
        },
        stack: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        status: {
            type: DataTypes.ENUM('Open', 'Reserved', 'Payed', 'Canceled', 'COD'),
            allowNull: false,
            defaultValue: 'Open'
        },
        reject: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        reject_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        receiver_info: {
            type: DataTypes.JSON,
            allowNull: true
        },
        delivery_info: {
            type: DataTypes.JSON,
            allowNull: true
        },
        billing: {
            type: DataTypes.JSON,
            charset: 'utf8mb4',
            collate: 'utf8mb4_bin',
            allowNull: true
        },
        reserved_at: {
            type: DataTypes.DATE,
            allowNull: true
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
        delivery_price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        discount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        tax: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        tax_shipping: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        tax_included: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        delivery_state: {
            type: DataTypes.ENUM('CheckQueue', 'OrderConfirm', 'PreparingOrder', 'SentOrder', 'ToCustomer'),
            allowNull: false,
            defaultValue: 'CheckQueue'
        },
        delivery_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        payment_type: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        payment_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true
        },
        session: {
            type: DataTypes.JSON,
            allowNull: true
        },
        channel: {
            type: DataTypes.STRING(32),
            allowNull: true
        },
        discount_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true
        },
        coupon_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true
        },
        lottery_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true
        },
        link_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true
        },
        affiliate_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true
        },
        email_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true
        },
        chat: {
            type: DataTypes.JSON,
            allowNull: true
        },
        meta: {
            type: DataTypes.JSON,
            allowNull: true
        },
        form: {
            type: DataTypes.JSON,
            allowNull: true,
            comment: 'Collect custom inputs for the checkout form (e.g., {customer_cpr: ...}). These fields are configured by the seller in Shop -> Options -> Checkout -> Form.'
        },
        subscription_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true
        },
        language: {
            type: DataTypes.STRING(7),
            allowNull: true
        }
    }, {
        tableName: 'baskets',
        timestamps: true,
        paranoid: true, // Enables soft deletes via deleted_at column
        underscored: true
    });

    Basket.associate = function(models) {
        // Define associations
        Basket.belongsTo(models.Shop, {
            foreignKey: 'shop_id',
            as: 'shop'
        });

        Basket.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        });

        Basket.belongsTo(models.Customer, {
            foreignKey: 'customer_id',
            as: 'customer'
        });

        Basket.belongsTo(models.DiscountCode, {
            foreignKey: 'discount_id',
            as: 'discount'
        });

        Basket.belongsTo(models.Coupon, {
            foreignKey: 'coupon_id',
            as: 'coupon'
        });

        Basket.belongsTo(models.Lottery, {
            foreignKey: 'lottery_id',
            as: 'lottery'
        });

        Basket.belongsTo(models.Affiliate, {
            foreignKey: 'affiliate_id',
            as: 'affiliate'
        });

        Basket.belongsTo(models.Email, {
            foreignKey: 'email_id',
            as: 'email'
        });

        // You might also have basket items as a separate model
        Basket.hasMany(models.BasketItem, {
            foreignKey: 'basket_id',
            as: 'items'
        });
    };

    return Basket;
};