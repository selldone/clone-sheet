const axios = require("axios");
const { Product } = require("./models");

async function syncProducts() {
    try {
        console.log("🔄 Syncing products...");

        // Ensure the Product table is synced with the database
        await Product.sync({ alter: true });  // This will adjust the table to match the model

        console.log("✅ Product table synced.");

        const { data } = await axios.get("https://fakestoreapi.com/products");

        console.log("🔄 Fetched Products:", data); // Log the fetched products data

        // Loop through the fetched products and insert them into the database
        for (const item of data) {
            try {
                //console.log(`🔄 Inserting product: ${item.title}`);
                // Use upsert to insert or update the product based on the primary key 'id'
                await Product.upsert({
                    id: item.id,           // Use the product's ID as the primary key
                    title: item.title,
                    price: item.price,
                    image: item.image
                });
                //console.log(`✅ Inserted product: ${item.title}`);
            } catch (error) {
                console.error(`❌ Error inserting product: ${item.title}`, error);
            }
        }

        console.log("✅ Products synced successfully.");
        return { success: true, message: "Products synced successfully!" };
    } catch (error) {
        console.error("❌ Sync Error:", error);
        return { success: false, message: "Error syncing products." };
    }
}

module.exports = syncProducts;  // Export the function using CommonJS syntax
