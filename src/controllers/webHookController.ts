import { Request, Response } from 'express'
import { Webhook } from 'svix'
import { usersController } from '../controllers/usersController'

export const handleWebhook = async (req: Request, res: Response) => {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
  if (!WEBHOOK_SECRET) {
    throw new Error('You need a WEBHOOK_SECRET in your .env')
  }

  const headers = req.headers;
  const payload = req.body;

  const svix_id = headers['svix-id'] as string;
  const svix_timestamp = headers['svix-timestamp'] as string;
  const svix_signature = headers['svix-signature'] as string;

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ message: 'Missing Svix headers' });
  }

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any = null

  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    })
  } catch (err: any) {
    console.error('Error verifying webhook:', err.message)
    return res.status(400).json({
      success: false,
      message: 'Webhook verification failed.',
    })
  }

  const { id, email_addresses, first_name, last_name } = evt.data
  const eventType = evt.type
  console.log(`Webhook received with ID: ${id}, type: ${eventType}`)
  console.log('Webhook body:', evt.data)

  // Handle the webhook event based on eventType
  try {
    switch (eventType) {
      case 'user.created':
        await usersController.createUser(
          {
            body: {
              email: email_addresses[0].email_address,
            },
          } as Request,
          res,
        )
        break

      case 'user.updated':
        await usersController.updateUser(
          {
            params: { id },
            body: {
              email: email_addresses[0].email_address,
              firstName: first_name,
              lastName: last_name,
            },
          } as any,
          res,
        )
        break

      case 'user.deleted':
        await usersController.deleteUser({ params: { id } } as any, res)
        break

      default:
        console.log(`Unhandled event type: ${eventType}`)
        res.status(200).json({ success: true, message: 'Webhook received' })
    }
  } catch (error) {
    console.error('Error handling webhook event:', error)
    res.status(500).json({ message: 'Error handling webhook event' })
  }
}