import express from 'express';
import { getAllTransactions, addTransactions } from '../controllers/transactionController.js';


const transactionRouter = express.Router();

transactionRouter.post('/add-transaction', addTransactions)

transactionRouter.post('/get-transaction', getAllTransactions)

export default transactionRouter;