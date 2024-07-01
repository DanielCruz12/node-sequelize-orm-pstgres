import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

//* Create an Express application
const app = express();

//* Middleware to parse JSON bodies
app.use(express.json());

app.use(cors());