import express from 'express';
import { createClass, getAllClasses, getOneClass, getStudentsInClass, updateClassTeacher, getOneClassByTeacherId, getStudentsInSubject } from '../controllers/ClassController.js';

const classRoutes = express.Router();

classRoutes.get('/', getAllClasses);
classRoutes.get('/:id', getOneClass);
classRoutes.get('/get-students/:id', getStudentsInClass);
classRoutes.get('/get-students-by-subject/:subid', getStudentsInSubject);
classRoutes.get('/get-class-by-teacher/:id', getOneClassByTeacherId);
classRoutes.put('/assign-teacher/:id', updateClassTeacher);
classRoutes.post('/create', createClass);



export default classRoutes;