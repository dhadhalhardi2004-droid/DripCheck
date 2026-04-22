const express = require("express");
const router = express.Router();

const { getOutfitSuggestion } = require("../controllers/aiController");

router.get("/suggest", getOutfitSuggestion);

module.exports = router;