import express from 'express'
import { addSubjectMakrs } from '../controllers/MarksController.js';

const MarkRouter = express.Router();

MarkRouter.post('/subject-marks/:subid', addSubjectMakrs)

export default MarkRouter