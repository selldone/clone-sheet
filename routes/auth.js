const express = require("express");
const router = express.Router();
const { KeyValue, User} = require("../models");
const axios = require("axios");

// ✅ Set Global Axios Headers
axios.defaults.headers.common["User-Agent"] =
    "Selldone-App/1.0 (https://selldone.com) Node.js/" + process.versions.node;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Referer"] = "https://selldone.com/";
axios.defaults.headers.common["Accept-Language"] = "en-US,en;q=0.9";


// ✅ Set global default configurations for Axios
axios.defaults.timeout = 10000; // 10 seconds timeout globally

// ✅ Save Token and Ensure "Bearer" Prefix
router.post("/set-token", async (req, res) => {
    try {
        let { token } = req.body;

        if (!token) {
            return res.status(400).json({ success: false, message: "❌ Token is required." });
        }

        // ✅ Add "Bearer" prefix if missing
        if (!token.startsWith("Bearer ")) {
            token = `Bearer ${token}`;
        }

        // ✅ Save token in the database
        await KeyValue.upsert({ key: "auth_token", value: token, type: "string" });

        // ✅ Set global authorization header for axios
        axios.defaults.headers.common["Authorization"] = token;

        res.json({ success: true, message: "✅ Token saved successfully!" });
    } catch (error) {
        console.error("❌ Error saving token:", error);
        res.status(500).json({ success: false, message: "❌ Internal server error." });
    }
});

module.exports = router;
