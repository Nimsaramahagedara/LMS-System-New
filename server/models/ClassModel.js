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
    ownedBy:{
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
}, { timestamps: true });


const ClassModel = mongoose.model("classes", ClassSchema);

export default ClassModel;