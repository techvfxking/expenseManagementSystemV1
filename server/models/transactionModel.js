import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: [true, 'Amount is required'],
        },
        type: {
            type: String,
            required: [true, 'Type is required'],
        },
        category: {
            type: String,
            required: [true, 'Category is requried'],
        },
        date: {
            type: String,
            required: [true, , 'Date is required'],
        },
        refrence: {
            type: String,
        },
        description: {
            type: String,
            required: [true, 'description is required'],
        },
        userid: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

const transactionModel = mongoose.model('transactions', transactionSchema)

export default transactionModel
