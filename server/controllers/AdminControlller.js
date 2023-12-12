import SubjectModel from "../models/SubjectModel.js";
import UserModel from "../models/UserModel.js";

export const getOverview = async (req,res)=>{
    try {
        const AllUsers = await UserModel.find();
        const AllStudents = AllUsers.filter((val)=>{
            return val.role == 'student'
        })

        const AllTeachers = AllUsers.filter((val)=>{
            return val.role == 'teacher'
        })

        const maleStudents = AllStudents.filter((val)=>{
            return val.gender == 'male'
        })

        const femaleStudents = AllStudents.filter((val)=>{
            return val.gender == 'female'
        })
        const AllSubjects = await SubjectModel.find();


        


        const overview = {
            studentCount : AllStudents.length,
            subjectCount: AllSubjects.length,
            teacherCount: AllTeachers.length,
            maleCount:maleStudents.length,
            femaleCount:femaleStudents.length

        }

        res.status(200).json(overview);
    } catch (error) {
        res.status(500).json(error.message);
    }
}