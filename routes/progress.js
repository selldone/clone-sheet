// routes/progress.js
const express = require("express");
const router = express.Router();

// Store client connections
const clients = [];

// SSE endpoint
router.get("/stream", (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
    });

    const clientId = Date.now();
    const newClient = { id: clientId, res };
    clients.push(newClient);

    req.on("close", () => {
        const index = clients.findIndex(client => client.id === clientId);
        if (index !== -1) clients.splice(index, 1);
    });
});

// Function to send updates to all connected clients
const sendProgressUpdate = (type, message, progress) => {
    clients.forEach(client => {
        client.res.write(`data: ${JSON.stringify({ type, message, progress })}\n\n`);
    });
};

module.exports = { router, sendProgressUpdate };