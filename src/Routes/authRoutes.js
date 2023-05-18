const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../Controllers/authController");
const { allowedMethods } = require("../Middleware/allowedMethods");

const router = express.Router();
// allowing only related methods
router.use("/register", allowedMethods("POST"));
router.use("/login", allowedMethods("POST"));
router.use("/logout", allowedMethods("GET"));


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
module.exports = router;
