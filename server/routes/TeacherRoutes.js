import express from 'express';
import { LoginValidator } from '../middlewares/LoggedIn.js';
import { getMySubjects, getStudentsInClass, teacherOverview } from '../controllers/TeacherContraller.js';
import { submitAttendance, getAttendanceByOwnerId, deleteAttendance } from '../controllers/AttendanceController.js';

const TeacherRouter = express.Router();

TeacherRouter.use(LoginValidator);
TeacherRouter.get('/my-subjects', getMySubjects);
TeacherRouter.get('/get-overview', teacherOverview);
TeacherRouter.get('/get-students-in-class', getStudentsInClass);
TeacherRouter.post('/submit-attendance', submitAttendance)
TeacherRouter.get('/attendance', getAttendanceByOwnerId);
TeacherRouter.delete('/delete-attendance/:id', deleteAttendance);




export default TeacherRouter;