import express from 'express';
import colors from 'colors';
import * as dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDb from './config/connectDb.js';
import userRouter  from './routes/userRoute.js';
import transactionRouter from './routes/transactionRoutes.js';

dotenv.config();

connectDb();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: {
            data: "This is the default endpoint",
            name: "API for Expense management system"
        },

    })
});

app.use('/api/v1/users', userRouter);

app.use('/api/v1/transactions', transactionRouter);


const PORT = 8080 || process.env.PORT;
app.listen(PORT, () => console.log(`Server has started on http://localhost:${PORT}`.bgMagenta));
