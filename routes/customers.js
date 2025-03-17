const express = require("express");
const router = express.Router();
const {Customer} = require("../models");
const ResourceFetcher = require("../src/utils/ResourceSync"); // Ensure you have a progress utility


router.post("/fetch-customers", (new ResourceFetcher({
    resourceType: "customers",
    Model: Customer
})).createHandler());

module.exports = router;

module.exports = router;
