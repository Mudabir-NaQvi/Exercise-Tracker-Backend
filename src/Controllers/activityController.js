const Activity = require("../Models/activitySchema");
const ActivityType = require("../Models/activityTypeSchema");
const User = require("../Models/userSchema")

const createActivity = async (req, res) => {
    try {
        const { description, date, duration, activityType } = req.body
        // find the id of the activity type 
        const activityId = await ActivityType.findOne({ activityType });
        // if activity does not exist return 404
        if (!activityId) return res.status(404).json({ message: "please select a valid activity type!" })
        // create the activity
        const userActivity = new Activity({
            description,
            date,
            duration,
            activityType: activityId,
            user: req.user.id
        })
        // save the activity
        await userActivity.save();
        res.json({ message: "created successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const GetAllActivitiesOfUser = async (req, res) => {
    try {
        // get the id of current user from request
        const userId = req.user.id
        // find all activities associated with current user
        const userActivities = await Activity.find({ user: userId }).populate("activityType")
        res.json(userActivities)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteActivity = async (req, res) => {
    try {
        // get id of activity from request
        const id = req.params.id
        // find the activity to be deleted
        await Activity.findByIdAndDelete(id)
        res.json({ message: "activity deleted successfully" })
    } catch (error) {
        res.status(404).json({ message: "Activity does not exist!" })
    }
}

const getActivityById = async (req, res) => {
    try {
        // get id of activity from request
        const id = req.params.id
        // find the activity details
        const activity = await Activity.findById(id)
            .populate("activityType")
        res.json(activity)
    } catch (error) {
        res.status(404).json({ message: "Activity does not exist!" })
    }
}

const updateActivity = async (req, res) => {
    try {
        // get id of activity from request
        const id = req.params.id
        // get updated data from body
        const body = req.body
        // update the activity
        await Activity.findByIdAndUpdate(id, body, { new: true })
        res.json({ message: "activity updated successfully" })
    } catch (error) {
        res.status(404).json({ message: "Please provide the valid data!" })
    }
}

const getActivitiesByType = async (req, res) => {
    try {
        const activityType = req.query.activityType
        // find the id of the activity type 
        const activityId = await ActivityType.findOne({ activityType: activityType })
        // find the activities of the type
        const activities = await Activity.find({ activityType: activityId }).populate("activityType")
        res.json(activities)
    }
    catch (err) {
        console.log(err)
        res.status(404).json({ message: "Activity type does not exist!" })
    }
}


module.exports = {
    createActivity,
    GetAllActivitiesOfUser,
    deleteActivity,
    getActivityById,
    updateActivity,
    getActivitiesByType
}
