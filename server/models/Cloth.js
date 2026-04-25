// server/models/Cloth.js
const mongoose = require("mongoose");

const clothSchema = new mongoose.Schema({
  name: String,
  type: String,
  color: String,
  image: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Cloth", clothSchema);
