import ClassModel from "../models/ClassModel.js"
import SubjectModel from "../models/SubjectModel.js";
import UserModel from "../models/UserModel.js";



export const getAllClasses = async (req, res) => {
    try {
        const classes = await ClassModel.find().populate('ownedBy').exec();

        // Create an array to store the modified class objects
        const classesWithStudentCount = [];

        // Iterate through each class
        for (const classObj of classes) {
            // Count the number of students enrolled in the current class
            const studentCount = await UserModel.countDocuments({ classId: classObj._id, role:'student' });

            const classWithCount = {
                _id: classObj._id,
                grade: classObj.grade,
                subClass: classObj.subClass,
                ownedBy: classObj.ownedBy,
                subjects:classObj.subjects,
                // Add the student count to the class object
                studentCount: studentCount,
            };

            // Push the modified class object to the array
            classesWithStudentCount.push(classWithCount);
        }

        res.status(200).json(classesWithStudentCount);
    } catch (error) {
        res.status(500).json({
            message: error.mesasge
        })
    }
}

export const getOneClass = async (req, res) => {
    const { id } = req.params;

    try {
        const isClassExist = await ClassModel.findById(id);
        if (!isClassExist) {
            throw Error('That class not exist');

        }
        res.status(200).json(isClassExist);

    } catch (error) {
        res.status(500).json({
            message: error.mesasge
        })
    }
}

export const createClass = async (req, res) => {
    const data = req.body

    try {
        const classData = {
            grade: data.grade,
            subClass: data.subClass,
            students: Array(),
            ownedBy: null,
            subjects: Array()
        }

        const isSaved = await ClassModel.create(classData);

        res.status(200).json({ message: 'Class Created Successfully' })

    } catch (error) {
        res.status(500).json({
            message: error.mesasge
        })
    }
}

export const getStudentsInClass = async (req, res) => {
    const { id } = req.params;

    try {
        const allStudents = await UserModel.find({ role: 'student', classId: id });
        if (!allStudents) {
            throw Error('No Students Or Other Error');

        }
        res.status(200).json(allStudents);

    } catch (error) {
        res.status(500).json({
            message: error.mesasge
        })
    }
}

export const updateClassTeacher = async (req, res) => {
    const { id } = req.params;
    const { ownedBy } = req.body;

    try {
        console.log(id);
        const isAlreadyHaveClass = await ClassModel.find({ownedBy:ownedBy});
        if(isAlreadyHaveClass.length ==1 ){
            throw Error('One Teacher Can Own Only One Class');
        }
        const updateClass = await ClassModel.findById(id);
        if (!updateClass) {
            res.status(500).json({ message: 'Class Not Found' });
            return
        }
        updateClass.ownedBy = ownedBy;

        updateClass.save();
        console.log(updateClass);

        res.status(200).json({ message: 'Class Teacher Assigned Success!!', updateClass });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

export const getOneClassByTeacherId = async (req, res) => {
    const { id } = req.params;

    try {
        const isClassExist = await ClassModel.findOne({ ownedBy: id });
        if (!isClassExist) {
            throw Error('That class not exist');

        }
        res.status(200).json(isClassExist);

    } catch (error) {
        res.status(500).json({
            message: error.mesasge
        })
    }
}

export const getStudentsInSubject = async (req, res) => {
    //Subject id
    const { subid } = req.params;

    try {
        const subject = await SubjectModel.findById(subid);
        if(!subject){
            throw Error('No Subject in that ID')
        }
        const classIn = await ClassModel.findById(subject.classId);

        if(!classIn){
            throw Error('No Class For that Subject')
        }

        const allStudents = await UserModel.find({ role: 'student', classId: classIn._id });
        if (!allStudents) {
            throw Error('No Students Or Other Error');

        }
        res.status(200).json(allStudents);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.mesasge
        })
    }
}