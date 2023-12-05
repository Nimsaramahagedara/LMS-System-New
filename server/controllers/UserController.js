import UserModel from "../models/UserModel.js";
import jwt from 'jsonwebtoken';
import { sendEmail } from "../utils/sendEmail.js";

//PASS EMAIL ADDRESS HERE AND THIS WILL GENERATE A JWT TOKEN
const createToken = (email) => {
    return jwt.sign({ email }, process.env.SECRET_KEY,);
}

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY);
}

// LOGIN FUNCTION: This will send the token and userRole
export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const isExist = await UserModel.findOne({ email });
        if (!isExist) {
            throw Error('Email Not Exist !!');
        }

        // To Do: After implementing User Create part, enable this method
        // if(!isExist.isPasswordMatched(password)){
        //     throw Error('Password Incorrect !!');
        // }
        if (isExist.password !== password) {
            throw Error('Password Incorrect !!');
        }
        const id = isExist._id.toString();
        const token = createToken(id);
        
        //await sendEmail('nimsaramahagedara@gmail.com', "TEST EMAIL", { name: 'NIMSARA MAHAGEDARA', description: 'TEST DESCRIPTION', }, "./template/emailtemplate.handlebars");
        res.status(200).json({
            token,
            userRole: isExist.role
        })
    } catch (error) {
        //console.log(error);
        res.status(401).json({ message: error.message });
    }

}