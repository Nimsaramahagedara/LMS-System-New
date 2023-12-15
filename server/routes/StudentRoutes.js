import express from 'express';
import { CreateStudentAccount, getStudentDetails, getAllStudents , getStudentsByClassId, updateStudentById, deleteStudentById } from '../controllers/StudentController.js';
import { LoginValidator } from '../middlewares/LoggedIn.js';

const studentRouter = express.Router();

// Student-related routes
studentRouter.get('/', LoginValidator,getStudentDetails);
studentRouter.post('/create-student', CreateStudentAccount);
studentRouter.get('/:classId', getStudentsByClassId);
studentRouter.get('/students', getAllStudents);
studentRouter.put('/update-student/:id', updateStudentById); 
studentRouter.delete('/delete-student/:id', deleteStudentById); 

export default studentRouter;
