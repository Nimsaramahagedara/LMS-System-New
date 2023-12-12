// Import necessary modules/controllers
const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/NoticeController');

// Define routes
router.get('/portal/notices/all', noticeController.getAllNotices);

module.exports = router;
