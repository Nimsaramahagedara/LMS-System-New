import mongoose from 'mongoose';

const ClassSchema = new mongoose.Schema({
    grade: {
        type: String,
        required: true
    },
    subclass: {
        type:String,
        required: true
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'users',
    }],
    ownedBy:{
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
    subjects:{
        type: mongoose.Schema.ObjectId,
        ref: 'subjects'
    }
}, { timestamps: true });


const ClassModel = mongoose.model("classes", ClassSchema);

export default ClassModel;