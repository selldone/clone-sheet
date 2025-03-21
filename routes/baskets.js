// routes/categories.js
const express = require("express");
const router = express.Router();
const {Basket} = require("../models");
const ResourceFetcher = require("../src/utils/ResourceSync");


router.post("/fetch-baskets", (new ResourceFetcher({
    resourceType: "baskets",
    Model: Basket
})).createHandler());

module.exports = router;