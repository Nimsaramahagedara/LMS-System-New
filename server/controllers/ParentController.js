import ClassModel from "../models/ClassModel.js";
import UserModel from "../models/UserModel.js";

// Parent ACCOUNT CREATION
//THIS WILL RETURN PARENT ID IF ITS AVAILABLE, IF ITS NOT IT WILL CREATE ACCOUNT AND RETURN ID
export const getParentId = async (email, regNo) => {
    if (!email) {
        throw Error('Parent Email Required');
    }
    const isParentExist = await UserModel.findOne({ email: email });
    if (isParentExist) {
        if (isParentExist.role !== 'parent') {
            throw Error('Another account in this Parent email is exist')
        }

        //FLOW IF PARENT EMAIL EXIST
        if(process.env.DEVELOPMENT == 'false'){
            sendEmail(data.email, "One Student is Added to your account", { name: `Username : ${email}`, description: `Password: 1234`, }, "./template/emailtemplate.handlebars");
        }
        return isParentExist._id;

    }
    //Create new parent account
    const parent = {
        "regNo": regNo + 1,
        "firstName": null,
        "lastName": null,
        "gender": '',
        "contactNo": null,
        "dob": "08-08-2000",
        "parentId": null,
        "email": email,
        "password": '1234',
        "role": "parent",
        "classId": null,
        "ownedClass": null
    }
    const newParent = await UserModel.create(parent);
    //FLOW IF PARENT EMAIL EXIST
    if(process.env.DEVELOPMENT == 'false'){
        sendEmail(data.email, "Parent account is created", { name: `Username : ${email}`, description: `Password: 1234`, }, "./template/emailtemplate.handlebars");
    }
    return newParent._id;
}


    //get all students with parent
    export const getStudentsWithParent = async (req, res) => {
      
        const teacherId = req.loggedInId;
        try {
           
            const allClasses = await ClassModel.find({ ownedBy: teacherId});
            // Extract the class IDs from the teacher's classes
        const classIds = allClasses.map((teacherClass) => teacherClass._id);

        // Find all students in the specified class IDs and populate the 'parentId' field
        const allStudents = await UserModel.find({ role: 'student', classId: { $in: classIds } }).populate('parentId');
            if (!allStudents) {
                throw Error('No Students Or Other Error');

            }
            res.status(200).json(allStudents);

        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: error.mesasge
            })
        }
    }

    //get all students with parent
    export const getStudentsUsingParentId = async (req, res) => {
      
        const { id: parentId } = req.params;

        try {
            // Find the subject for the logged-in teacher
            const students = await UserModel.find({ parentId: parentId, role: "student" })
            .populate('classId');
    
            if (!students) {
                return res.status(404).json({ message: 'Student not found for the logged-in parent' });
            }
            res.status(200).json({ students });
        } catch (error) {
            console.error('Error fetching marks data:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };