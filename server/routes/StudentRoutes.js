import express from 'express';
import { CreateStudentAccount } from '../controllers/StudentController.js';

const studentRouter = express.Router();

studentRouter.post('/create-student', CreateStudentAccount);

export default studentRouter;