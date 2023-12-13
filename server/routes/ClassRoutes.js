import express from 'express';
import { createClass, getAllClasses, getOneClass, getStudentsInClass } from '../controllers/ClassController.js';

const classRoutes = express.Router();

classRoutes.get('/', getAllClasses);
classRoutes.get('/:id', getOneClass);
classRoutes.get('/get-students/:id', getStudentsInClass);
classRoutes.post('/create', createClass);


export default classRoutes;