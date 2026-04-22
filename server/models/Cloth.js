const mongoose = require("mongoose");

const clothSchema = new mongoose.Schema({
  name: String,
  type: String,
  color: String,
  image: String,
});

module.exports = mongoose.model("Cloth", clothSchema);