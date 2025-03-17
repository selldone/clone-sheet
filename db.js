const { Sequelize } = require('sequelize');
require('dotenv').config(); // For loading environment variables from .env file

// Create a Sequelize instance with DB configuration
const sequelize = new Sequelize(
    process.env.DB_NAME,  // Database name
    process.env.DB_USER,  // Database username
    process.env.DB_PASSWORD, // Database password
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mariadb',  // Database dialect, can be 'mysql', 'mariadb', 'postgres', etc.
    }
);

// Test the connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connection established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
}

testConnection();

module.exports = sequelize;
