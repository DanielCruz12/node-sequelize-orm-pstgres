import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { apiRoutes } from './routes/v1';
import sequelize from './database/dataBase';
import bodyParser from 'body-parser';

dotenv.config();

//* Create an Express application
const app = express();

//* Middleware to parse JSON bodies
app.use(express.json());

app.use(cors());
app.use('/api/v1', apiRoutes);
app.use('/api/v1/webhook/create', bodyParser.raw({ type: 'application/json' }));

app.use('/api/v1', (req, res) => {
    res.status(401).json({ message: "Route not found" });
});

const port = process.env.PORT || 3000;

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
}

sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }).catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });
