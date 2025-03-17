const mariadb = require("mariadb");

async function testConnection() {
    try {
        const conn = await mariadb.createConnection({
            host: "127.0.0.1", // Ensure it's 127.0.0.1 for local connections
            port: 4000,         // Ensure it's port 4000
            user: "root",       // User 'root' or the appropriate username
            password: "root",   // Password for the 'root' user
        });
        console.log("✅ Connected to MariaDB!");
        conn.end();
    } catch (err) {
        console.error("❌ Cannot connect:", err.code, "-", err.message);
    }
}

testConnection();
