const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NewStudentSchema = new Schema({
    studentId: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true,     
    },
    dob: {
        type: Number,
        required: true
    },
    guardianName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    }
}, { timestamps: false });

const NewStudent = mongoose.model("NewStudent", NewStudentSchema);

module.exports = NewStudent;