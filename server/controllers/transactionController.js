import transactionModel from "../models/transactionModel.js"

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await transactionModel.find({});
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

export { addTransactions, getAllTransactions }