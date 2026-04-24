const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
console.log("SERVER FILE RUNNING");
const authRoutes = require("./routes/authRoutes");
console.log("AUTH ROUTES:", authRoutes);
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
const clothesRoutes = require("./routes/clothesRoutes");
const aiRoutes = require("./routes/aiRoutes");

console.log("Auth routes loaded");

app.use("/api/clothes", clothesRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);

// database connection
mongoose.connect(
  "mongodb+srv://admin:hardi1404@cluster0.tf4h7re.mongodb.net/dripcheck?retryWrites=true&w=majority"
)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

// server
app.listen(4000, () => {
  console.log("Server running on port 4000");
});