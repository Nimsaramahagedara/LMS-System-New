import express from 'express';
import { CreateStudentAccount, getStudentDetails } from '../controllers/StudentController.js';
import { LoginValidator } from '../middlewares/LoggedIn.js';

const studentRouter = express.Router();

// Student-related routes
studentRouter.get('/', LoginValidator,getStudentDetails);
studentRouter.post('/create-student', CreateStudentAccount);


export default studentRouter;
