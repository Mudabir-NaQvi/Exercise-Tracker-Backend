const express = require("express");
const cookieParser = require("cookie-parser");
const User = require("./Models/userSchema");
require("dotenv").config();
const authRoutes = require("./Routes/authRoutes");
const userRoutes = require("./Routes/userRoutes");
const activityRoutes=require("./Routes/activityRoutes")
const authenticate = require("./Middleware/auth");
const cors = require("cors");
const app = express();


// middleware function for logging every request on console
app.use(({ method, path }, res, next) => {
  console.log(
    `new request to ${method} ${path} at ${new Date().toISOString()}`
  );
  next();
});


// connecting to db
require("./config/db");

// middleware to parse json data
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// router level middleware
app.use("/api/v1/auth/", authRoutes);
app.use("/api/v1/users/", userRoutes);
app.use("/api/v1/activity/", activityRoutes);

// redirect the user - / homepage
app.get("/", (req, res) => {
  res.redirect("/api/v1/");
});

// homepage
app.get("/api/v1/*", authenticate, async (req, res) => {
  res.send("Welcome to Homepage");
});

// not found page
app.get("/api/v1/*", (req, res) => {
  res.status(404).send("Page not found");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at localhost:${PORT || 5000}`);
});





