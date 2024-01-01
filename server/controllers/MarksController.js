import MarksModel from "../models/MarksModel.js";
import SubjectModel from "../models/SubjectModel.js";

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


//For Subject
export const addSubjectMakrs = async(req,res)=>{
    const {subid} = req.params;
    const payLoad = req.body;
    try {
        // const isExist = MarksModel.findOne({term: payLoad.term, subId:subid});
        // if(isExist){
        //     throw Error('Marks For that Term Already Exist')
        // }
        if(!payLoad?.term || !subid){
            throw Error('All Fields are required')
        }
        const markData = {
            subId: subid,
            term : payLoad.term,
            marks: payLoad.marks
        }
        const data = await MarksModel.create(markData)
        if(data)
        res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
}