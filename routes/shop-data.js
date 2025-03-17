const express = require("express");
const router = express.Router();
const {ShopData} = require("../models");
const ResourceFetcher = require("../src/utils/ResourceSync");


// ✅ Fetch and Store Products

router.post("/fetch-shop-data", (new ResourceFetcher({
    resourceType: "shop-data",
    Model: ShopData
})).createHandler());

module.exports = router;