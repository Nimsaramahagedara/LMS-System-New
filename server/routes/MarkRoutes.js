import express from 'express'
import { addSubjectMakrs, getMarksByStudentId } from '../controllers/MarksController.js';

const MarkRouter = express.Router();

MarkRouter.post('/subject-marks/:subid', addSubjectMakrs)
MarkRouter.get('/get-marks-by-student', getMarksByStudentId)

export default MarkRouter