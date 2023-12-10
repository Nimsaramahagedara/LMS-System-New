import express from 'express';
import { createClass, getAllClasses, getOneClass } from '../controllers/ClassController.js';

const classRoutes = express.Router();

classRoutes.get('/', getAllClasses);
classRoutes.get('/:id', getOneClass);
classRoutes.post('/create', createClass);


export default classRoutes;