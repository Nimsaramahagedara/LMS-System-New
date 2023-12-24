import express from "express"
import { createActivity, deleteActivity, getAllActivity, updateActivity } from "../controllers/ActivityController.js";

const ActivityRouter = express.Router();

ActivityRouter.get('/:subId', getAllActivity);
ActivityRouter.post('/:subId', createActivity);
ActivityRouter.put('/:activityId', updateActivity);
ActivityRouter.delete('/:activityId', deleteActivity);



export default ActivityRouter;