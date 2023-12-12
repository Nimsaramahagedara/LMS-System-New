import express from 'express';
import { CreateStudentAccount } from '../controllers/StudentController.js';
import noticeController from '../controllers/NoticeController.js';

const studentRouter = express.Router();

// Student-related routes
studentRouter.post('/create-student', CreateStudentAccount);

// Notices route for the student dashboard
studentRouter.get('/student-dashboard/notices/all', noticeController.getAllNotices);

export default studentRouter;
