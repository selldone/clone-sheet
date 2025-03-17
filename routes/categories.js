// routes/categories.js
const express = require("express");
const router = express.Router();
const {Category} = require("../models");
const ResourceFetcher = require("../src/utils/ResourceSync");


router.post("/fetch-categories", (new ResourceFetcher({
    resourceType: "categories",
    Model: Category
})).createHandler());

module.exports = router;