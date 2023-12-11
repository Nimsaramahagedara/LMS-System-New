const mongoose = require('mongoose');

const noticesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // Fix typo in the field name
  audience: { type: String, required: true },
});

const NoticeModel = mongoose.model('Notice', noticesSchema); // Fix model name

module.exports = NoticeModel;
