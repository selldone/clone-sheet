// routes/categories.js
const express = require("express");
const router = express.Router();
const {BasketItem} = require("../models");
const ResourceFetcher = require("../src/utils/ResourceSync");


router.post("/fetch-basket-items", (new ResourceFetcher({
    resourceType: "basket-items",
    Model: BasketItem
})).createHandler());

module.exports = router;