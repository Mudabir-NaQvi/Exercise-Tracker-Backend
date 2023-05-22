const express = require("express");
const { getUsers, getUser } = require("../Controllers/userController");
const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);

module.exports = router;
