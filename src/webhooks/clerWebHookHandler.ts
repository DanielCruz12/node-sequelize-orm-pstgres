import { Request, Response } from 'express'
import { Webhook } from 'svix'

export const handleWebhook = async (req: Request, res: Response) => {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
  if (!WEBHOOK_SECRET) {
    return res.status(500).json({ message: 'Webhook secret is not defined.' })
  }

  const headers = req.headers
  const payload = req.body
  const svixId = headers['svix-id']
  const svixTimestamp = headers['svix-timestamp']
  const svixSignature = headers['svix-signature']

  if (!svixId || !svixTimestamp || !svixSignature) {
    return res.status(400).json({ message: 'Missing Svix headers.' })
  }

  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: any = null

  try {
    evt = wh.verify(payload, {
      'svix-id': Array.isArray(svixId) ? svixId.join(',') : svixId,
      'svix-timestamp': svixTimestamp as string,
      'svix-signature': svixSignature as string,
    })
  } catch (err: any) {
    console.error('Error verifying webhook:', err.message)
    return res.status(400).json({
      success: false,
      message: 'Webhook verification failed.',
    })
  }

  const { id } = evt.data
  const eventType = evt.type
  console.log(`Webhook received with ID: ${id}, type: ${eventType}`)
  console.log('Webhook body:', evt.data)

  // Handle the webhook event based on eventType
  switch (eventType) {
    case 'user.created':
      // Add logic to handle user creation
      break
    case 'user.updated':
      // Add logic to handle user update
      break
    case 'user.deleted':
      // Add logic to handle user deletion
      break
    default:
      console.log(`Unhandled event type: ${eventType}`)
  }

  return res.status(200).json({ success: true, message: 'Webhook received' })
}
