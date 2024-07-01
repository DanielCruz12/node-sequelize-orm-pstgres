import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { apiRoutes } from './routes/v1';

dotenv.config();

//* Create an Express application
const app = express();

//* Middleware to parse JSON bodies
app.use(express.json());

app.use(cors());
app.use('/api/v1', apiRoutes);

app.listen(3000, () => { console.log("first") })