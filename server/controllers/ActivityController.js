import ActivityModel from "../models/ActivityModel.js"

export const getAllActivity = async (req, res) => {
    const { subId } = req.params;
    try {
        if (!subId) {
            throw Error('Subject Id Required');
        }
        const data = await ActivityModel.find({subId});
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createActivity = async (req, res) => {
    const { subId } = req.params;
    try {
        if (!subId) {
            throw Error('Subject Id Required');
        }
        req.body.subId = subId;
        const activity = req.body;
        const data = await ActivityModel.create(activity);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateActivity = async (req, res) => {
    const { activityId } = req.params;
    try {
        const activity = req.body;
        if (!activityId) {
            throw Error('Activity Id Required');
        }
        const data = await ActivityModel.findByIdAndUpdate(activityId, activity);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteActivity = async (req, res) => {
    const { activityId } = req.params;
    try {
        if (!activityId) {
            throw Error('Activity Id Required');
        }
        const data = await ActivityModel.findByIdAndDelete(activityId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}