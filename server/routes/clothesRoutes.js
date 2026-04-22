const express = require("express");
const router = express.Router();

const {
  addCloth,
  getClothes,
} = require("../controllers/clothesController");

router.post("/", addCloth);
router.get("/", getClothes);

module.exports = router;