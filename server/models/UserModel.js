import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    regNo: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true,     
    },
    dob: {
        type: Date
    },
    parentId: {
        type: mongoose.Schema.ObjectId,
        ref:'Users',
    },
    email: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type:String
    },
    classId:{
        type:mongoose.Schema.ObjectId,
        ref:'classes'
    },
    ownedClass:{
        type:mongoose.Schema.ObjectId,
        ref:'classes'
    }
}, { timestamps: true });

//Encrypt the password before saving the document
UserSchema.pre("save", async function (next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

//Password compare method
UserSchema.methods.isPasswordMatched = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;