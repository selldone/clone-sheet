// src/TableConfig.js
class TableConfig {
    constructor() {
        if (TableConfig.instance) {
            return TableConfig.instance;
        }

        TableConfig.instance = this;

        this.tables = {


            "categories": {
                modelName: "Category",
                displayName: "Categories",
                icon: "folder",
                endpoint: '/categories/fetch-categories',
                table: "categories"
            },

            "products": {
                modelName: "Product",
                displayName: "Products",
                icon: "package",
                endpoint: '/products/fetch-products',
                table: "products"
            },


            "product-variants": {
                modelName: "ProductVariant",
                displayName: "Product Variants",
                icon: "layers",
                endpoint: '/product-variants/fetch-product-variants',
                table: "product_variants"
            },

            "customers": {
                modelName: "Customer",
                displayName: "Customers",
                icon: "users",
                endpoint: '/customers/fetch-customers',
                table: "customers"
            },

            "shop-data": {
                modelName: "ShopData",
                displayName: "Shop Data",
                icon: "shopping-bag",
                endpoint: '/shop-data/fetch-shop-data',
                table: "shop_data"
            },
            "baskets":{
                modelName: "Basket",
                displayName: "Baskets",
                icon: "shopping-cart",
                endpoint: '/baskets/fetch-baskets',
                table: "baskets"
            },
            "basket-items":{
                modelName: "BasketItem",
                displayName: "Basket Items",
                icon: "shopping-cart",
                endpoint: '/basket-items/fetch-basket-items',
                table: "basket_items"
            },


        };
    }


    getAllResources() {
        return Object.entries(this.tables).map(([key, value]) => ({
            id: key,
            name: value.displayName,
            icon: value.icon,
            endpoint: value.endpoint
        }));
    }


}

// Create and export a singleton instance
const tableConfig = new TableConfig();
module.exports = tableConfig;