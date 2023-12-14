// Import necessary modules/controllers
import express from 'express';
import { createNotice, getAllNotices, updateNotice, deleteNotice, getNoticesByUserRole, getNoticesByPublishedBy } from '../controllers/NoticeController.js';

const noticeRouter = express.Router();

// Define routes
noticeRouter.get('/', getAllNotices);
noticeRouter.get('/:userRole', getNoticesByUserRole);
noticeRouter.post('/create-notice', createNotice);
noticeRouter.get('/get-notice-by-publisher/:publishedBy', getNoticesByPublishedBy);
noticeRouter.put('/update-notice/:id',updateNotice);
noticeRouter.delete('/delete-notice/:id', deleteNotice); 

export default  noticeRouter;
