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