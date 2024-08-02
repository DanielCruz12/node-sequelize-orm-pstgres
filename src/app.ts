import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
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

app.post(
  '/api/webhooks',
  // Use raw body parser for the specified content type
  bodyParser.raw({ type: 'application/json' }),
  async function (req, res) {
    // Retrieve the webhook secret from environment variables
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
      console.error('You need a WEBHOOK_SECRET in your .env');
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Extract the headers and raw payload
    const headers = req.headers;
    const payload = req.body;

    // Extract Svix-specific headers
    const svix_id = headers['svix-id'] as string;
    const svix_timestamp = headers['svix-timestamp'] as string;
    const svix_signature = headers['svix-signature'] as string;

    // Check for missing Svix headers
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).json({ message: 'Missing Svix headers' });
    }

    // Create a new Svix webhook instance with the secret
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: any = null;

    try {
      // Verify the webhook payload and headers
      evt = wh.verify(payload, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      });
    } catch (err: any) {
      console.error('Error verifying webhook:', err.message);
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    // Log the received event details
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
    console.log('Webhook body:', evt.data);

    return res.status(200).json({
      success: true,
      message: 'Webhook received',
    });
  }
);

//* Fallback route for undefined endpoints
app.use('/api/v1', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;
