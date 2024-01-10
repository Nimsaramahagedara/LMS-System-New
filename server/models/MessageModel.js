import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    stdId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users'
    },
    subject:{
        type:String,
        required:true
    },
    content: {
        type: String,
        required:true
    }
},{timestamps:true})

const MessageModel = mongoose.model('message', MessageSchema);
export default MessageModel;