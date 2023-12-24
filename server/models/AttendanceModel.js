// import mongoose from 'mongoose';

// const attendanceSchema = new mongoose.Schema({
//     attendedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
//     ownedBy: { type: mongoose.Schema.ObjectId, ref: 'users' },
//     classId: { type: mongoose.Schema.ObjectId, ref: 'classes' },
//     date: { type: Date, default: Date.now },
// });

// const AttendanceModel = mongoose.model('Attendance', attendanceSchema);

// export default AttendanceModel;

import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    attendedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    ownedBy: { type: mongoose.Schema.ObjectId, ref: 'users' },
    classId: { type: mongoose.Schema.ObjectId, ref: 'classes' },
    date: { type: Date, default: Date.now, unique: true, index: true },
});

// Compound index for classId and date
attendanceSchema.index({ classId: 1, date: 1 }, { unique: true });

// Virtual field for studentCount
attendanceSchema.virtual('studentCount').get(function () {
    return this.attendedStudents.length;
});

const AttendanceModel = mongoose.model('Attendance', attendanceSchema);

export default AttendanceModel;
