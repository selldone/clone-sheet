const express = require("express");
const router = express.Router();
const {KeyValue, Customer} = require("../models");
const axios = require("axios");
const {sendProgressUpdate} = require("./progress"); // Ensure you have a progress utility

const LIMIT = 50; // Number of customers to fetch per request

// Fetch and Store Shop Customers
router.post("/fetch-customers", async (req, res) => {
    try {
        sendProgressUpdate("customers", "🚀 Starting customer sync...", 0);

        // Retrieve stored authentication token and shop ID
        const tokenEntry = await KeyValue.findOne({where: {key: "auth_token"}});
        const shopEntry = await KeyValue.findOne({where: {key: "selected_shop_id"}});
        const lastUpdatedEntry = await KeyValue.findOne({where: {key: "customers_last_updated_at"}});

        if (!tokenEntry || !shopEntry) {
            sendProgressUpdate("customers", "❌ Token or shop ID is missing.", 100);
            return res.status(400).json({success: false, message: "❌ Token or shop ID is missing."});
        }

        // Use last updated timestamp or default to a very old date
        let lastUpdatedAt = lastUpdatedEntry ? lastUpdatedEntry.value : '';
        let offset = 0;
        let hasMore = true;
        let totalFetched = 0;
        let totalCount = 0;

        sendProgressUpdate("customers", `Fetching customers batch (offset: ${offset})...`, 5);

        while (hasMore) {
            const response = await axios.get(
                `https://api.selldone.com/shops/${shopEntry.value}/database/customers/sync`,
                {
                    params: {
                        updated_at: lastUpdatedAt,
                        limit: LIMIT,
                        offset: offset,
                    },
                    headers: {
                        Authorization: tokenEntry.value,
                        Accept: "application/json",
                    },
                    timeout: 10000, // Prevent hanging requests
                }
            );

            // Scope access check or other errors:
            if (response.data.error) {
                throw new Error(response.data.error_msg);
            }

           // console.log('response.data', response)
            const customers = response.data.customers;
            if (!customers || customers.length === 0) break;

            if (!totalCount) {
                // Keep first total as the total available records after updated_at:
                totalCount = response.data.total || 0;
                sendProgressUpdate("customers", `Found ${totalCount} customers to sync`, 10);
            }

            sendProgressUpdate("customers", `Processing ${customers.length} customers...`,
                Math.min(Math.round((totalFetched / totalCount) * 100), 95)
            );

            // ✅ Upsert each customer
            for (let i = 0; i < customers.length; i++) {
                const customer = customers[i];
                try {
                    await Customer.upsert(customer);
                    // Update progress every few customers to avoid excessive logging
                    if (i % 10 === 0) {
                        sendProgressUpdate("customers", `Saved customer '${customer.email || customer.id}'`,
                            Math.min(Math.round(((totalFetched + i) / totalCount) * 100), 95)
                        );
                    }
                } catch (err) {
                    sendProgressUpdate("customers", `⚠️ Error with customer '${customer.email || customer.id}': ${err.message}`,
                        Math.min(Math.round(((totalFetched + i) / totalCount) * 100), 95)
                    );
                }
            }

            totalFetched += customers.length;
            offset += LIMIT;
            hasMore = customers.length === LIMIT; // Continue if we got a full batch
        }

        // ✅ Update the last updated timestamp for customers
        const latestUpdatedAt = new Date().toISOString();
        await KeyValue.upsert({key: "customers_last_updated_at", value: latestUpdatedAt, type: "string"});

        sendProgressUpdate("customers", `✅ ${totalFetched} customers updated successfully!`, 100);
        res.json({
            success: true,
            message: `✅ ${totalFetched} customers updated successfully!`,
            fetchedCount: totalFetched
        });
    } catch (error) {
        console.error("❌ Error fetching customers:", error);
        sendProgressUpdate("customers", `❌ Error: ${error.message}`, 100);
        res.status(500).json({success: false, message: "❌ Error fetching customers."});
    }
});

module.exports = router;
