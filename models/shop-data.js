// models/shop-data.js
const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const ShopData = sequelize.define('ShopData', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        shop_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'shops',
                key: 'id'
            }
        },
        // Virtual product stats
        total_products_virtual: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        sell_products_virtual: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        send_products_virtual: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        view_products_virtual: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},

        // Physical product stats
        total_products_physical: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        sell_products_physical: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        send_products_physical: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        view_products_physical: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},

        // File product stats
        total_products_file: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        sell_products_file: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        send_products_file: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        view_products_file: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},

        // Service product stats
        total_products_service: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        sell_products_service: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        send_products_service: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        view_products_service: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},

        // Subscription product stats
        total_products_subscription: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        sell_products_subscription: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        send_products_subscription: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        view_products_subscription: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},

        // Avocado stats
        view_avocados: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        request_avocados: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        sell_avocados: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},

        // Hyper stats
        hyper_views: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        hyper_new_carts: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        hyper_checkouts: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        hyper_pays: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        hyper_rejects: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},

        // General engagement stats
        views: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        amp: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        likes: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        powers: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        favorites: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        comments: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        comments_approved: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        ratings: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        wishlist: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},

        // User stats
        users: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        users_add: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        social: {type: DataTypes.TEXT, allowNull: true,

            get() {
                const value = this.getDataValue("social");
                if (typeof value === "object") return value;

                return value ? JSON.parse(value) : null;
            },
            set(value) {
                this.setDataValue("social", value ? JSON.stringify(value) : null);
            },

        },

        // Content stats
        products_add: {type: DataTypes.BIGINT.UNSIGNED, defaultValue: 0, allowNull: false},
        products_remove: {type: DataTypes.BIGINT.UNSIGNED, defaultValue: 0, allowNull: false},
        categories_add: {type: DataTypes.BIGINT.UNSIGNED, defaultValue: 0, allowNull: false},
        categories_remove: {type: DataTypes.BIGINT.UNSIGNED, defaultValue: 0, allowNull: false},
        customers_add: {type: DataTypes.BIGINT.UNSIGNED, defaultValue: 0, allowNull: false},
        customers_remove: {type: DataTypes.BIGINT.UNSIGNED, defaultValue: 0, allowNull: false},
        pages_add: {type: DataTypes.BIGINT.UNSIGNED, defaultValue: 0, allowNull: false},
        pages_remove: {type: DataTypes.BIGINT.UNSIGNED, defaultValue: 0, allowNull: false},

        // Visitor stats
        new_visitors: {type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false},
        returning_visitors: {type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false},
        page_views: {type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false},

        // Order stats
        order_physical_added: {type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false},
        order_physical_checkout: {type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false},
        order_virtual_added: {type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false},
        order_virtual_checkout: {type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false},
        order_file_added: {type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false},
        order_file_checkout: {type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false},
        order_service_added: {type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false},
        order_service_checkout: {type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false},
        order_subscription_added: {type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false},
        order_subscription_checkout: {type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false},

        // Delivery service stats
        ds_count: {type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false},
        ds_payments: {type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false},
        ds_confirms: {type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false},
        ds_sends: {type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false},
        ds_deliveries: {type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false},
        ds_cancels: {type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false},
        ds_rejects: {type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0, allowNull: false}
    }, {
        modelName: "ShopData",
        tableName: 'shop_data',
        timestamps: true,
        underscored: true,
        paranoid: false, // Enables soft delete functionality
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",

        indexes: [
            {
                fields: ['shop_id']
            }
        ]
    });

    ShopData.associate = (models) => {
        ShopData.belongsTo(models.Shop, {
            foreignKey: 'shop_id',
            as: 'shop'
        });
    };

    return ShopData;
};