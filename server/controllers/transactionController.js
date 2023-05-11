import transactionModel from "../models/transactionModel.js"
import moment from 'moment';
const getAllTransactions = async (req, res) => {
    try {
        const { frequency, selectedDate, type } = req.body;
        const transactions = await transactionModel.find({
            ...(frequency !== 'custom' ? {
                date: {
                    $gt: moment().subtract(Number(frequency), 'd').toDate()
                },
            } : {
                date: {
                    $gte: selectedDate[0],
                    $lte: selectedDate[1]
                }
            }),
            userid: req.body.userid,
            ...(type !== 'all' && { type }),
        });
        res.status(200).json(transactions);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

const addTransactions = async (req, res) => {
    try {
        const newTransaction = new transactionModel(req.body);
        await newTransaction.save();
        res.status(201).send("Transaction created");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const editTransactions = async (req, res) => {
    try {
        await transactionModel.findOneAndUpdate({ _id: req.body.transacrionid }, req.body.payload)
        res.status(200).send("Edited Successfully")
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const deleteTransactions = async (req, res) => {
    try {
        await transactionModel.findOneAndDelete({ _id: req.body.transacationId });
        res.status(200).send("Transaction Deleted!");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export { addTransactions, getAllTransactions, editTransactions, deleteTransactions }