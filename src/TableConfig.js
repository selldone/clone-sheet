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
                endpoint: '/categories/fetch-categories'
            },

            "products": {
                modelName: "Product",
                displayName: "Products",
                icon: "package",
                endpoint: '/products/fetch-products'
            },


            "product-variants": {
                modelName: "ProductVariant",
                displayName: "Product Variants",
                icon: "layers",
                endpoint: '/product-variants/fetch-product-variants'
            },

            "customers": {
                modelName: "Customer",
                displayName: "Customers",
                icon: "users",
                endpoint: '/customers/fetch-customers'
            },

            "shop-data": {
                modelName: "ShopData",
                displayName: "Shop Data",
                icon: "shopping-bag",
                endpoint: '/shop-data/fetch-shop-data'
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