import mongoose from "mongoose";

// THIS IS FOR PROTOTYPE THE BANK ACOCUNT
const BankSchema = new mongoose.Schema({
    balance:{
        type:Number,
        default:0.00
    }
})

const BankModal = mongoose.model('banks', BankSchema);
export default BankModal;