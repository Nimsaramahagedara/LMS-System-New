import BankModal from "../models/BankModel.js";
import FeesModel from "../models/FeesModel.js";

export const DoPayment = async (req, res) => {
    const data = req.body;
    try {
        if (!data.stdId || !data.amount || !data.year) {
            throw Error('All the fields are required')
        }
        const isExist = await FeesModel.findOne({ stdId: data.stdId, year: data.year });

        if (isExist) {
            throw Error('Already Payed for that Year for that student');
        }
        const donePayment = await FeesModel.create(data);
        //Add Money To Bank
        const addToBank = await BankModal.findByIdAndUpdate(
            '65990171c09d8a7450d37e17',
            { $inc: { balance: donePayment.amount } }, // $inc to increment the amount
            { new: true }
        );
        if (addToBank) {
            console.log('Deposited to bank total Balance :', addToBank.balance);
        }
        res.status(200).json(donePayment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getPaymetnHistory = async (req, res) => {
    //Student id array
    const { studentIds } = req.body;
    console.log(studentIds);
    try {
        if (studentIds.length < 0) {
            throw Error('Please Provide Student ID list')
        }
        const payments = await FeesModel.find({ stdId: { $in: studentIds } });

        res.status(200).json({ payments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getBankBalance = async (req, res) => {
    try {
        const balance = await BankModal.findById('65990171c09d8a7450d37e17');
        res.status(200).json({ balance: balance.balance })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
