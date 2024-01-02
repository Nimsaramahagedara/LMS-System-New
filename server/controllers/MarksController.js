import MarksModel from "../models/MarksModel.js";
import SubjectModel from "../models/SubjectModel.js";
import mongoose from "mongoose";

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
        const isExist =await MarksModel.findOne({term: payLoad.term, subId:subid});
        console.log(isExist);
        if(isExist){
            throw Error('Marks For that Term Already Exist')
        }
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


export const getMarks = async (req, res) => {
    const loggedInId = req.loggedInId;
    console.log(loggedInId);

    try {
        // Find the subject for the logged-in teacher
        const subj = await SubjectModel.findOne({ teachBy: loggedInId });

        if (!subj) {
            return res.status(404).json({ message: 'Subject not found for the logged-in teacher' });
        }

        // Fetch marks data with populated student details based on the subject ID
        const marksData = await MarksModel.find({ subId: subj._id })
            .populate({
                path: 'marks.studentId',
                model: 'users'  // The model referenced in the MarksModel schema
                // You can add more options here based on your requirements
            })
            .populate({
                path: 'subId',
                model: 'subjects'  // The model referenced in the MarksModel schema
                // You can add more options here based on your requirements
            });

        res.status(200).json({ marksData });
    } catch (error) {
        console.error('Error fetching marks data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getMarksByStudentId = async (req, res) => {
    try {
        const studentId = req.params;

        // Ensure studentId is provided
        if (!studentId) {
            return res.status(400).json({ error: 'Missing studentId in the request body' });
        }

        // Find marks for the specified studentId
        const marks = await MarksModel.find({
            'marks.studentId': new mongoose.Types.ObjectId(studentId)
        }, { subId: 1, term: 1, 'marks.$': 1 })
        .populate('subId');

        // If no marks found, return an empty array
        if (!marks || marks.length === 0) {
            return res.status(404).json({ message: 'No marks found for the specified studentId' });
        }

        // Extract the relevant data from the results
        const extractedData = marks.map(({ subId, term, marks }) => {
            return {
                subId,
                term,
                studentId: marks[0].studentId,
                mark: marks[0].mark
            };
        });

        // Return the results
        res.json(extractedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
