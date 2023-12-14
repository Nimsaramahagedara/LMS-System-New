// NoticesModel.js

import mongoose from 'mongoose';

const NoticesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  audience: {
    type: String,
    required: true,
    enum: ["student", "teacher", "parent", "admin", "support", "all"],

  },
  publishedBy: {
    type: String,
    required: true,
    enum: ["teacher", "admin", "support"],

  },
}, { timestamps: true });

const NoticesModel = mongoose.model('notices', NoticesSchema);

export default NoticesModel;
