const Cloth = require("../models/Cloth");

// add cloth
exports.addCloth = async (req, res) => {
  try {
    const newCloth = new Cloth(req.body);
    await newCloth.save();
    res.json(newCloth);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get all clothes
exports.getClothes = async (req, res) => {
  try {
    const clothes = await Cloth.find();
    res.json(clothes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};