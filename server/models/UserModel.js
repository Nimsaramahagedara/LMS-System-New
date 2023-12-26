import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import CounterModel from './CounterModel.js';

const UserSchema = new mongoose.Schema({
    regNo: {
        type: Number,
        unique: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["male", "female", ""],
    },
    contactNo: {
        type: Number,
    },
    address: {
        type: String,
        default: 'Not Given'
    },
    dob: {
        type: Date
    },
    parentId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "teacher", "parent", "admin", "support", ""],
    },
    classId: {
        type: mongoose.Schema.ObjectId,
        ref: 'classes'
    },
    ownedClass: {
        type: mongoose.Schema.ObjectId,
        ref: 'classes'
    }
}, { timestamps: true });

//Encrypt the password before saving the document
UserSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    try {
        // Increment the counter and use the new value as the registration number
        const counter = await CounterModel.findByIdAndUpdate('657724061c76593cd1deec46',
            { $inc: { lastRegNo: 1 } },
            { new: true, upsert: true }
        );

        this.regNo = counter.lastRegNo;
    } catch (error) {
        console.log(error);
    }


    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//Password compare method
UserSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


const UserModel = mongoose.model("users", UserSchema);

export default UserModel;