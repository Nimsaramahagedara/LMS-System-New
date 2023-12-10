import mongoose from 'mongoose';

const ClassSchema = new mongoose.Schema({
    grade: {
        type: Number,
        required: true
    },
    subClass: {
        type:String,
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }],
    ownedBy:{
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        default:[null]
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subjects',
        default:[null]
    }],
}, { timestamps: true });


const ClassModel = mongoose.model("classes", ClassSchema);

export default ClassModel;