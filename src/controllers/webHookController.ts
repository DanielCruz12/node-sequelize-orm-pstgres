import { Request, Response } from 'express';
import { Webhook } from 'svix';
import { usersController } from '../controllers/usersController';

export const handleWebhook = async (req: Request, res: Response) => {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    return res.status(500).json({ message: 'Webhook secret is not defined.' });
  }

  const headers = req.headers;
  const payload = req.body;
  const svixId = Array.isArray(headers['svix-id']) ? headers['svix-id'][0] : headers['svix-id'];
  const svixTimestamp = Array.isArray(headers['svix-timestamp']) ? headers['svix-timestamp'][0] : headers['svix-timestamp'];
  const svixSignature = Array.isArray(headers['svix-signature']) ? headers['svix-signature'][0] : headers['svix-signature'];

  if (!svixId || !svixTimestamp || !svixSignature) {
    return res.status(400).json({ message: 'Missing Svix headers.' });
  }

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any = null;

  try {
    evt = wh.verify(payload, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    });
  } catch (err: any) {
    console.error('Error verifying webhook:', err.message);
    return res.status(400).json({
      success: false,
      message: 'Webhook verification failed.',
    });
  }

  const { id, email_addresses, first_name, last_name } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook received with ID: ${id}, type: ${eventType}`);
  console.log('Webhook body:', evt.data);

  // Handle the webhook event based on eventType
  try {
    switch (eventType) {
      case 'user.created':
        await usersController.createUser({
          body: { email: email_addresses[0].email_address, firstName: first_name, lastName: last_name },
        } as Request, res);
        break;

      case 'user.updated':
        await usersController.updateUser({
          params: { id },
          body: { email: email_addresses[0].email_address, firstName: first_name, lastName: last_name },
        } as any, res);
        break;

      case 'user.deleted':
        await usersController.deleteUser({ params: { id } } as any, res);
        break;

      default:
        console.log(`Unhandled event type: ${eventType}`);
        res.status(200).json({ success: true, message: 'Webhook received' });
    }
  } catch (error) {
    console.error('Error handling webhook event:', error);
    res.status(500).json({ message: 'Error handling webhook event' });
  }
};
