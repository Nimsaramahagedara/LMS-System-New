import mongoose from "mongoose";

const MarksSchema = new mongoose.Schema({
    studentId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'users'
    },
    subId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'subjects'
    },
    mark: {
        type: Number,
        default: 0,
        min:0,
        max:100
    },
    term:{
        type:Number,
        enum:[1,2,3]
    }
},{timestamps:true})

const MarksModel = mongoose.model('marks', MarksSchema);
export default MarksModel;