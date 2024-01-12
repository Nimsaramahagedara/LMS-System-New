import MessageModel from "../models/MessageModel.js";

export const createMessage = async (req, res) => {
    const stdId = req.loggedInId;
    const { subject, content } = req.body;
    try {
        const newMessage = await MessageModel.create({
            stdId,
            subject,
            content,
        });

        return res.status(201).json(newMessage);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getAllMessages = async (req,res)=>{
    try {
        const messages= await MessageModel.find().populate('stdId')
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateMessageStatus = async (req,res)=>{
    const {id} = req.params;
    try {
        if(!id){
            throw Error('Message ID Required')
        }
        const messages= await MessageModel.findByIdAndUpdate(id,{status:1},{new:true}).populate('stdId')
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteMessage = async (req,res)=>{
    const {id} = req.params;
    try {
        if(!id){
            throw Error('Message ID Required')
        }
        const messages= await MessageModel.findByIdAndDelete(id,{new:true}).populate('stdId')
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error)
    }
}