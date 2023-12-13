// Import necessary modules/controllers
import express from 'express';
import { createNotice, getAllNotices } from '../controllers/NoticeController.js';

const noticeRouter = express.Router();


// Define routes
noticeRouter.get('/:userRole', getAllNotices);
noticeRouter.post('/', createNotice);

export default  noticeRouter;
