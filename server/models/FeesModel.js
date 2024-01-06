import mongoose from "mongoose";

const FeesSchema = new mongoose.Schema({
    stdId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users'
    },
    term: {
        type: Number,
        default: 1,
        enum: [1, 2, 3]
    },
    amount:{
        type:Number,
        required:true
    },
    year: {
        type: Number,
        default: new Date().getFullYear()
    }
},{timestamps:true})

const FeesModel = mongoose.model('fees', FeesSchema);
export default FeesModel;