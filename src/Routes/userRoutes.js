const express = require("express");
const { getUsers } = require("../Controllers/userController");
const router = express.Router();

router.get("/", getUsers);

module.exports = router;
