const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = 4444;

// middlewares
// modified cors setup
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());

// db connect
require("./models/connection");
require("./models/User");

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Routes

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
