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