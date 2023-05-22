const mongoose = require("mongoose");

const activityTypeSchema = new mongoose.Schema({
    activityType: {
        type: String,
        required: true,
        max: 25
    },

})

const ActivityType = mongoose.model("ActivityType", activityTypeSchema)
module.exports = ActivityType