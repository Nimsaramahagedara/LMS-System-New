import mongoose from 'mongoose';

const SubjectSchema = new mongoose.Schema({
    subName: {
        type: String,
    },
    teachBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'Users',
    },
    classId: {
        type: mongoose.Schema.ObjectId,
        ref: 'classes'
    }
}, { timestamps: true });


const SubjectModel = mongoose.model("subjects", SubjectSchema);

export default SubjectModel;