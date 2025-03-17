const express = require("express");
const router = express.Router();
const {Variant} = require("../models");
const ResourceFetcher = require("../src/utils/ResourceSync");


// ✅ Fetch and Store Products

router.post("/fetch-product-variants", (new ResourceFetcher({
    resourceType: "product-variants",
    Model: Variant
})).createHandler());


module.exports = router;