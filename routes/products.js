const express = require("express");
const router = express.Router();
const {Product} = require("../models");
const ResourceFetcher = require("../src/utils/ResourceSync");


// ✅ Fetch and Store Products

router.post("/fetch-products", (new ResourceFetcher({
    resourceType: "products",
    Model: Product
})).createHandler());


module.exports = router;