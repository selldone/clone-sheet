const express = require("express");
const path = require("path");
require('dotenv').config();  // Load environment variables from .env file

const app = express();

// ✅ Add middleware to parse JSON and form data
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({extended: true})); // Parse URL-encoded form data


require("./db");


// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Route to render SQL server information page
app.get('/', (req, res) => {
    const DB_CONFIG = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME
    };
    // Import TableConfig in your route file
    const tableConfig = require('./src/TableConfig');

    res.render('layout', {
        DB_CONFIG,
        resources: JSON.stringify(tableConfig.getAllResources()
        )
    });
});


const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const shopRoutes = require("./routes/shop");
const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/categories");
const adminRoutes = require("./routes/admin");
const customersRoutes = require("./routes/customers");
const shopDataRoutes = require("./routes/shop-data");
const databaseRoutes = require('./routes/database');
const productVariantsRoutes = require('./routes/product-variants');
const meRoutes = require('./routes/me');
const basketsRoutes = require('./routes/baskets');
const basketItemsRoutes = require('./routes/basket-items');


// ✅ Use Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/shop", shopRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/admin", adminRoutes);
app.use("/customers", customersRoutes);
app.use("/shop-data", shopDataRoutes);
app.use("/database", databaseRoutes);
app.use("/product-variants", productVariantsRoutes);
app.use("/me", meRoutes);
app.use("/baskets", basketsRoutes);
app.use("/basket-items", basketItemsRoutes);


const progressRouter = require('./routes/progress');
app.use('/progress', progressRouter.router);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
