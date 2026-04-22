const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express(); // ✅ MUST be before app.use

app.use(cors());
app.use(express.json());

// routes
const clothesRoutes = require("./routes/clothesRoutes");
const aiRoutes = require("./routes/aiRoutes");

app.use("/api/clothes", clothesRoutes);
app.use("/api/ai", aiRoutes);

// DB
mongoose.connect("mongodb+srv://admin:hardi1404@cluster0.tf4h7re.mongodb.net/?appName=Cluster0")
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

app.listen(4000, () => {
  console.log("Server running on port 4000");
});