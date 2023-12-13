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
}, { timestamps: true });

const NoticesModel = mongoose.model('noticers', NoticesSchema);

export default NoticesModel;
