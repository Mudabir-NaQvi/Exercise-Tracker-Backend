const mongoose = require("mongoose");


const activitySchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        max: 64
    },
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: Date,
        required: true,
    },
    activityType: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ActivityType"
        }
    ],
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]

})

const Activity = mongoose.model("Activity", activitySchema)
module.exports = Activity