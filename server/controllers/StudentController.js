import ClassModel from "../models/ClassModel.js";
import UserModel from "../models/UserModel.js";
import { getParentId } from "./ParentController.js";

// Student ACCOUNT CREATION
export const CreateStudentAccount = async (req, res) => {
    const data = req.body;
    try {
        const isExist = await UserModel.findOne({ email: data.email });
        if (isExist) {
            throw Error('Email Already Exist !!');
        }

        if(!data.classId || data.classId == null){
            throw Error('Student Must Enroll For a Class When they Register');
        }
        

        const gotParentId =await getParentId(data.parentEmail, data.regNo)
        
        const studentData = {
            regNo: data.regNo,
            firstName: data.firstName,
            lastName:data.lastName,
            address:data.address,
            dob:data.dob,
            password:data.password,
            email:data.email,
            gender:data.gender,
            role:'student',
            contactNo:data.contactNo,
            parentId:gotParentId,
            classId:data.classId,
            ownedClass:null

        }

        const result = await UserModel.create(studentData);
        var enrollClass = await ClassModel.findById(data.classId);
        enrollClass.students.push(result._id);
        await enrollClass.save();
        
        if(process.env.DEVELOPMENT == 'false'){
            sendEmail(data.email, "Account Created Successfully", { name: `Username : ${data.email}`, description: `Password: ${data.password} \n Account Type: ${data.role}`, }, "./template/emailtemplate.handlebars");
        }

        res.status(200).json({
            message: 'Account Created Successfully!', result
        })
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ message: error.message });
    }

}
