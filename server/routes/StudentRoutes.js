import express from 'express';
import { CreateStudentAccount } from '../controllers/StudentController.js';

const studentRouter = express.Router();

// Student-related routes
studentRouter.post('/create-student', CreateStudentAccount);


export default studentRouter;
