import SubjectModel from "../models/SubjectModel.js";

export const createSubject = async (req, res) => {
    try {
        const { classId } = req.params;
        const subjectData = req.body;

        if (!classId) {
            throw Error('To Create a subject, Class is a must');
        }
        subjectData.classId = classId;

        const createdSubject = await SubjectModel.create(subjectData)
        res.status(200).json({ message: 'Subject Created Successfully', subject: createdSubject });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllSubjectsInClass = async (req, res) => {
    try {
        const { classId } = req.params;

        if (!classId) {
            throw Error('Please Provide ClassId as Params');
        }

        const allSubjects = await SubjectModel.find({classId}).populate('teachBy');
        res.status(200).json(allSubjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteSubject = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw Error('Please Provide Subject Id as Params');
        }

        const deletedSub = await SubjectModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Subject Deleted Successfully', subject:deletedSub });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const subjectData = req.body;

        if (!id) {
            throw Error('To Update a subject, Subject Id is a must');
        }

        const updatedSub = await SubjectModel.findByIdAndUpdate(id,subjectData);
        res.status(200).json({ message: 'Subject Updated Successfully', subject: updatedSub });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getSubjectTeacher = async(req,res)=>{
    //pass the Subject id
    const {id} = req.params;
    try {
        if (id) {
            try {
                const teacher = await SubjectModel.findById(id).populate('teachBy');
                if (!teacher) {
                    throw Error('No Subjects Or Other Error');
        
                }
                res.status(200).json(teacher);
        
            } catch (error) {
                res.status(500).json({
                    message: error.mesasge
                })
            }

        }else{
            throw Error('Subject Id Required')
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}