import UserModel from "../models/UserModel.js";
import { sendEmail } from "../utils/sendEmail.js";


// USER ACCOUNT CREATION
export const CreateSupportAccount = async (req, res) => {
    const data = req.body;
    try {
        const isExist = await UserModel.findOne({ email: data.email });
        if (isExist) {
            throw Error('Email Already Exist !!');
        }
        
        const supportData = {
            regNo: data.regNo,
            firstName: data.firstName,
            lastName:data.lastName,
            address:data.address,
            dob:data.dob,
            password:data.password,
            email:data.email,
            gender:"",
            role:'support',
            contactNo:data.contactNo,
            parentId:null,
            classId:null,
            ownedClass:null

        }
        const result = await UserModel.create(supportData);
        
        if(!process.env.ISDEVELOP){
            sendEmail(data.email, "Account Created Successfully", { name: `Username : ${data.email}`, description: `Password: ${data.password}`, }, "./template/emailtemplate.handlebars");
        }

        res.status(200).json({
            message: 'Account Created Successfully!'
        })
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ message: error.message });
    }

}