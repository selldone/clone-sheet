const express = require("express");
const path = require("path");
require('dotenv').config();  // Load environment variables from .env file

const app = express();

// ✅ Add middleware to parse JSON and form data
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data


require("./db");
const syncProducts = require("./syncProducts");  // Import the syncProducts function


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
    res.render('index', { DB_CONFIG });
});


// Route to trigger sync products
app.get('/sync-products', async (req, res) => {
    const result = await syncProducts(); // Call the syncProducts function
    res.json(result); // Send back the result of the sync
});

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const shopRoutes = require("./routes/shop");
const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/categories");
const adminRoutes = require("./routes/admin");
const customersRoutes = require("./routes/customers");

// ✅ Use Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/shop", shopRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/admin", adminRoutes);
app.use("/customers", customersRoutes);


const progressRouter = require('./routes/progress');
app.use('/progress', progressRouter.router);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
