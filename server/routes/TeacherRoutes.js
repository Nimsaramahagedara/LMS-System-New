import express from 'express';
import { LoginValidator } from '../middlewares/LoggedIn.js';
import { getMySubjects } from '../controllers/TeacherContraller.js';

const TeacherRouter = express.Router();

TeacherRouter.use(LoginValidator);
TeacherRouter.get('/my-subjects', getMySubjects);




export default TeacherRouter;