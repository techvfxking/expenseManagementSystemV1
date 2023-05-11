import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: [true, 'Amount is required'],
        },
        categrory: {
            type: String,
            required: [true, 'Category is requried'],
        },
        refrence: {
            type: String,
        },
        description: {
            type: String,
            required: [true, 'description is required'],
        },
        date: {
            type: String,
            required: [true, , 'Date is required'],
        },
    },
    { timestamps: true }
)

const transactionModel = mongoose.model('transactions', transactionSchema)

export default transactionModel
