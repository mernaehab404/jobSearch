 import { dbConnection } from './database/dbConnection.js'
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import AuthRouter from './src/routes/AuthRoutes.js';
import userRouter from './src/routes/userRoutes.js';
import companyRouter from './src/routes/companyRoutes.js';
import jobRouter from './src/routes/jobRoutes.js';

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());


// Load routes
app.use('/auth',AuthRouter)
app.use('/user',userRouter)
app.use('/company',companyRouter)
app.use('/job',jobRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
