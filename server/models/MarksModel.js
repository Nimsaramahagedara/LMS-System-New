import mongoose from "mongoose";

const MarksSchema = new mongoose.Schema({
    // studentId:{
    //     type:mongoose.SchemaTypes.ObjectId,
    //     ref:'users'
    // },
    subId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subjects'
    },
    marks: [
        {
            studentId: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'users'
            },
            mark: {
                type: Number,
                default: 0
            }
        }
    ],
    term: {
        type: Number,
        enum: [1, 2, 3]
    }
}, { timestamps: true })

const MarksModel = mongoose.model('marks', MarksSchema);
export default MarksModel;