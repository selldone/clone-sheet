const express = require("express");
const router = express.Router();
const {ProductVariant} = require("../models");
const ResourceFetcher = require("../src/utils/ResourceSync");


// ✅ Fetch and Store Products

router.post("/fetch-product-variants", (new ResourceFetcher({
    resourceType: "product-variants",
    Model: ProductVariant
})).createHandler());


module.exports = router;