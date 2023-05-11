import express from 'express';
import { getAllTransactions, addTransactions, editTransactions, deleteTransactions } from '../controllers/transactionController.js';


const transactionRouter = express.Router();

transactionRouter.post('/add-transaction', addTransactions)

transactionRouter.post('/get-transaction', getAllTransactions)

transactionRouter.post('/edit-transaction', editTransactions)

transactionRouter.post('/delete-transaction', deleteTransactions)

export default transactionRouter;