const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/NoticeController');

// Define routes
router.get('/notices/:role', noticeController.getNotices);

module.exports = router;
