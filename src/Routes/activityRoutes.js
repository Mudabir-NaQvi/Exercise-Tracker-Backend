const express = require("express");
const { createActivity, GetAllActivitiesOfUser, deleteActivity, getActivityById } = require("../Controllers/activityController");
const authenticate = require("../Middleware/auth");
const router = express.Router();

router.use("/", authenticate)
router.post("/", createActivity)
router.get("/", GetAllActivitiesOfUser);
router.get("/:id", getActivityById)
router.delete("/:id", deleteActivity);

module.exports = router;
