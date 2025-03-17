const express = require("express");
const router = express.Router();
const { KeyValue, User } = require("../models");
const axios = require("axios");

// ✅ Fetch User Info and Save in Database
router.post("/fetch-user", async (req, res) => {
    try {
        // ✅ Retrieve token from the database
        const tokenEntry = await KeyValue.findOne({ where: { key: "auth_token" } });

        if (!tokenEntry) {
            return res.status(401).json({ success: false, message: "❌ Token not found. Please authenticate." });
        }

        const { data } = await axios.get("https://api.selldone.com/user");

        // ✅ Save user info in database
        await User.upsert({
            id: data.id,
            name: data.name,
            email: data.email
        });

        res.json({ success: true, user: data });
    } catch (error) {
        console.error("❌ Error fetching user info:", error);

        if (error.response && error.response.status === 403) {
            return res.status(403).json({ success: false, message: "❌ Authentication failed. Check your token." });
        }

        res.status(500).json({ success: false, message: "❌ Error fetching user info." });
    }
});

module.exports = router;
