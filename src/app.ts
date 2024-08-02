import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { buffer } from 'micro';
import { Webhook } from 'svix';
import { apiRoutes } from './routes/v1';

dotenv.config();

//* Create an Express application
const app = express();

//* Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

//* Define routes
app.use('/api/v1', apiRoutes);

//* Webhook route
app.post('/api/webhooks', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    console.error('WEBHOOK_SECRET is missing in .env');
    return res.status(500).json({ message: 'Internal server error' });
  }

  try {
    const headers = req.headers;
    const payload = (await buffer(req)).toString();

    const svix_id = headers['svix-id'] as string;
    const svix_timestamp = headers['svix-timestamp'] as string;
    const svix_signature = headers['svix-signature'] as string;

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).json({ message: 'Missing svix headers' });
    }

    const wh = new Webhook(WEBHOOK_SECRET);
    const evt: any = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });

    const { id } = evt.data;
    const eventType = evt.type;
    console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
    console.log('Webhook body:', evt.data);

    return res.status(200).json({ success: true, message: 'Webhook received' });
  } catch (err: any) {
    console.error('Error verifying webhook:', err.message);
    return res.status(400).json({ success: false, message: err.message });
  }
});

//* Fallback route for undefined endpoints
app.use('/api/v1', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;
