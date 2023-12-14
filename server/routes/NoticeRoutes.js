// Import necessary modules/controllers
import express from 'express';
import { createNotice, getAllNotices, updateNotice, deleteNotice, getNoticesByUserRole } from '../controllers/NoticeController.js';

const noticeRouter = express.Router();


// Define routes
noticeRouter.get('/:userRole', getNoticesByUserRole);
noticeRouter.get('/', getAllNotices);

export default  noticeRouter;
