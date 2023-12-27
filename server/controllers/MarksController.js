import MarksModel from "../models/MarksModel";
import SubjectModel from "../models/SubjectModel";

export const getMarksTable = async(req,res)=>{
    const {classId, term} = req.params;
    try {
        if(!classId || !term){
            throw Error('Class ID and Term is required');
        }
        //Get all the subjects belongs to that classId
        const subjectsBelongsToClass = await SubjectModel.find({classId});

        //Extract the Subject Id s from that documents and make a array of subject id s
        const subjectIdArray = subjectsBelongsToClass.map((subject)=> subject._id)

        const marksList = await MarksModel.find({subId:{$in: subjectIdArray}, term});

        res.status(200).json(marksList);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const addStudentsMark = async(req,res)=>{

}