const Activity = require("../Models/activitySchema");
const ActivityType = require("../Models/activityTypeSchema");
const moment = require("moment")
const createActivity = async (req, res) => {
    try {
        let { description, date, duration, activityType } = req.body
        
        const momentDate = moment(date);
        // get current date
        const currentDate = moment(); 
        
        // if the date is less than the current date return 400
        if(momentDate.isBefore(currentDate)){
            return res.status(400).json({message: "Cannot set previous date and time"})            
        }

        // moment module duration object for formatting date time 
        const momentDuration = moment.duration(duration, "minutes")
        // formatting received duration into minutes and hours
        const formattedDuration = moment.utc(momentDuration.asMilliseconds()).format("H[h] m[m]")
        // find the id of the activity type 
        const activityId = await ActivityType.findOne({ activityType });
        // if activity does not exist return 404
        if (!activityId)
          return res
            .status(403)
            .json({ message: "please select a valid activity type!" });

        // create the activity
        const userActivity = new Activity({
            description,
            date,
            duration: formattedDuration,
            activityType: activityId,
            user: req.user.id
        })
        // save the activity
        await userActivity.save();
        res.status(201).json({ message: "created successfully" })
    } catch (error) {
        console.log(error)
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
        res.status(204).json({ message: "activity deleted successfully" })
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
        // spread document into new object for top level deep copy modification 
        const response = { ...activity._doc }
        // modify the activity type object to just return the name
        response.activityType = activity.activityType[0].activityType
        res.json(response)
    } catch (error) {
        res.status(404).json({ message: "Activity does not exist!" })
    }
}

const updateActivity = async (req, res) => {
    try {
        let { description, date, duration, activityType } = req.body
        const momentDate = moment(date);
        // get current date
        const currentDate = moment(); 
        // if the date is less than the current date return 400
        if(momentDate.isBefore(currentDate)){
            return res.status(400).json({message: "Cannot set previous date and time"})            
        }

        // moment module duration object for formatting date time 
        const momentDuration = moment.duration(duration, "minutes")
        // formatting received duration into minutes and hours
        const formattedDuration = moment.utc(momentDuration.asMilliseconds()).format("H[h] m[m]")
        // find the id of the activity type 
        const activityId = await ActivityType.findOne({ activityType });
        // if activity does not exist return 404
        if (!activityId) return res.status(404).json({ message: "please select a valid activity type!" })
        // get id of activity from request
        const id = req.params.id
       
        // find and update
        await Activity.findByIdAndUpdate(id, {
            description,
            date,
            duration: formattedDuration,
            activityType: activityId,
            user: req.user.id
        }, { new: true })
        res.json({ message: "activity updated successfully" })
    } catch (error) {
        res.status(404).json({ message: "Please provide the valid data!" })
    }
}

const getActivitiesByType = async (req, res) => {
    try {
        const { id } = req.user
        const activityType = req.query.activityType
        // find the id of the activity type 
        const activityId = await ActivityType.findOne({ activityType: activityType })
        // find the activities of the type
        const activities = await Activity.find({ activityType: activityId, user: id }).sort("date").populate("activityType")
        res.json(activities)
    }
    catch (err) {
        console.log(err)
        res.status(404).json({ message: "Activity type does not exist!" })
    }
}

const getRecentActivities = async (req, res) => {
    try {
        const { id } = req.user
        // find all type of activities
        const activityTypes = await ActivityType.find();
        // every object returns a promise 
        const result = await Promise.all(
            // iterate over all types
            activityTypes.map(async (type) => {
                // find the total activities of a each type
                const activityCount = await Activity.countDocuments({ activityType: type._id, user: id });
                // find the last recent activity
                const last = await Activity.findOne({ activityType: type._id }).sort("-date");
                // return the object
                return {
                    activityType: type.activityType,
                    count: activityCount,
                    lastDate: last ? last.date : null
                };
            })
        );
        res.json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error!" })
    }
}


module.exports = {
    createActivity,
    GetAllActivitiesOfUser,
    deleteActivity,
    getActivityById,
    updateActivity,
    getActivitiesByType,
    getRecentActivities

}
