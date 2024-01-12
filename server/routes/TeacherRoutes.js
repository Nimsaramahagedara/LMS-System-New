import express from 'express';
import { LoginValidator } from '../middlewares/LoggedIn.js';
import { getMySubjects, getStudentsInClass, teacherOverview } from '../controllers/TeacherContraller.js';
import { submitAttendance, getAttendanceByOwnerId, deleteAttendance } from '../controllers/AttendanceController.js';

import { getMarks } from '../controllers/MarksController.js';
import { deleteMessage, getAllMessages, updateMessageStatus } from '../controllers/MessageController.js';
const TeacherRouter = express.Router();

TeacherRouter.use(LoginValidator);
TeacherRouter.get('/my-subjects', getMySubjects);
TeacherRouter.get('/get-overview', teacherOverview);
TeacherRouter.get('/get-students-in-class', getStudentsInClass);
TeacherRouter.post('/submit-attendance', submitAttendance)
TeacherRouter.get('/attendance', getAttendanceByOwnerId);
TeacherRouter.delete('/delete-attendance/:id', deleteAttendance);
TeacherRouter.get('/marks', getMarks);

// PRIVATE MESSAGE ROUTE
TeacherRouter.get('/messages',LoginValidator,getAllMessages);
TeacherRouter.put('/messages/:id',LoginValidator,updateMessageStatus);
TeacherRouter.delete('/messages/:id',LoginValidator,deleteMessage);




export default TeacherRouter;