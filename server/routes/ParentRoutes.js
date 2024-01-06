import express from 'express';
import { getStudentsWithParent, getStudentsUsingParentId } from '../controllers/ParentController.js';
import { LoginValidator } from '../middlewares/LoggedIn.js';
import { getAttendanceByStudentId } from '../controllers/AttendanceController.js';


    const parentRoutes = express.Router();

        parentRoutes.get('/get-students', LoginValidator , getStudentsWithParent);
        parentRoutes.get('/get-students-using-parent-id/:id', getStudentsUsingParentId);
        parentRoutes.get('/get-attendance/:id', getAttendanceByStudentId);

    export default parentRoutes;