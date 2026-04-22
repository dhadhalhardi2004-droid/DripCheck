const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// routes
const clothesRoutes = require("./routes/clothesRoutes");
app.use("/api/clothes", clothesRoutes);

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// DB connect
mongoose.connect("mongodb+srv://admin:test123@cluster0.e15vwz4.mongodb.net/dripcheck")
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
