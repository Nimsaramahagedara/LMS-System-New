import UserModel from "../models/UserModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import bcrypt from 'bcryptjs';

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
        
        
        if(process.env.DEVELOPMENT == 'false'){
            console.log('Sending Email');
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

export const getAllSupportMembers = async(req,res)=>{
    try {
        const result = await UserModel.find({role:'support'});
        
        if(result){
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

export const getSupportMember = async(req,res)=>{
    const {email} = req.params;

    try {
        const result = await UserModel.findOne({email});
        if(result){
            res.status(200).json(result);
        }else{
            throw Error('Account not exist');
        }
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}
export const deleteSupportMember = async(req,res)=>{
    const {email} = req.params;

    try {
        const isExist = await UserModel.findOne({email});
        if(!isExist){
            console.log('Account not exist');
            throw Error('Account Not Exist')
        }
        const isDeleted = await UserModel.findOneAndDelete({email});

        if(isDeleted){
            res.status(200).json({
                message:'Successfully Deleted'
            });
        }
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

export const updateSupportMember = async(req,res)=>{
    const {email} = req.params;
    const data = req.body;

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

    // const salt = await bcrypt.genSalt(10);
    // this.password = await bcrypt.hash(this.password, salt);

    try {
        const isExist = await UserModel.findOne({email});
        if(!isExist){
            res.status(500).json({
                message:'Account Not Exist'
            });
        }
        const isUpdated = await UserModel.findOneAndUpdate({email}, supportData);

        if(isUpdated){
            res.status(200).json({
                message:'Successfully Updated'
            });
        }
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}