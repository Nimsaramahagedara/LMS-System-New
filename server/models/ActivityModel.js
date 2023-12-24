import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
    title:{
        type: String, 
        required: true
    },
    desc:{
        type:String,
        required: true
    },
    subId:{
        type: mongoose.Schema.ObjectId,
        ref:'classes'
    },
    actType:{
        type:String,
        enum:['activity','learning']
    },
    link:{
        type:String,
        default:'not-given'
    }

},{timestamps: true})

const ActivityModel = mongoose.model('activities', ActivitySchema);
export default ActivityModel