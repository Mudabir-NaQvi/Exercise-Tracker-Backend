const express = require("express");
const { createActivity, GetAllActivitiesOfUser, deleteActivity, getActivityById, updateActivity, getActivitiesByType } = require("../Controllers/activityController");
const authenticate = require("../Middleware/auth");
const router = express.Router();

router.use("/", authenticate)
router.post("/create", createActivity)
router.get("/all", GetAllActivitiesOfUser);
router.get("/by-type", getActivitiesByType)
router.get("/:id", getActivityById)
router.delete("/:id", deleteActivity);
router.put("/:id", updateActivity)

module.exports = router;
