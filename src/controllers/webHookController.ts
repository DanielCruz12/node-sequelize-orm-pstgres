import { Request, Response } from 'express'
import { Webhook } from 'svix'
import { usersController } from './usersController'

export const handleWebHook = async (req: Request, res: Response) => {
  //* Retrieve the webhook secret from environment variables
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
  if (!WEBHOOK_SECRET) {
    console.error('You need a WEBHOOK_SECRET in your .env')
    return res.status(500).json({ message: 'Internal server error' })
  }

  //* Extract the headers and raw payload
  const headers = req.headers
  const payload = req.body
  const rawBody = payload.toString('utf8')

  console.log('rawBody:', rawBody)
  console.log(
    'rawBody type:',
    Buffer.isBuffer(rawBody) ? 'Buffer' : typeof rawBody,
  )

  //* Extract Svix-specific headers
  const svix_id = headers['svix-id'] as string
  const svix_timestamp = headers['svix-timestamp'] as string
  const svix_signature = headers['svix-signature'] as string

  //* Check for missing Svix headers
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ message: 'Missing Svix headers' })
  }

  //* Create a new Svix webhook instance with the secret
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: any = null

  try {
    //* Verify the webhook payload and headers
    evt = wh.verify(rawBody, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    })
  } catch (err: any) {
    console.error('Error verifying webhook:', err.message)
    return res.status(400).json({
      success: false,
      message: err.message,
    })
  }

  const { email_addresses, first_name, last_name, id } = evt.data
  console.log(evt.data)
  console.log('Received Clerk ID:', id)

  const eventType = evt.type
  console.log(eventType)
  try {
    switch (eventType) {
      // User related events
      case 'user.created':
      case 'user.createdAtEdge':
      case 'session.created':
        await usersController.createUser(
          {
            body: {
              email: email_addresses[0].email_address,
              id,
              name: `${first_name} ${last_name}`,
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

      // Session related events
      case 'session.ended':
      case 'session.removed':
      case 'session.revoked':
        // Handle session events if needed
        console.log(`Session event: ${eventType}`)
        break

      // Other events
      case 'email.created':
      case 'permission.created':
      case 'permission.updated':
      case 'permission.deleted':
      case 'role.created':
      case 'role.updated':
      case 'role.deleted':
      case 'organizationInvitation.created':
      case 'organizationInvitation.revoked':
      case 'organizationInvitation.accepted':
      case 'organizationMembership.created':
      case 'organizationMembership.updated':
      case 'organizationMembership.deleted':
      case 'organizationDomain.created':
      case 'organizationDomain.updated':
      case 'organizationDomain.deleted':
        // Log these events for now
        console.log(`Event received: ${eventType}`)
        break

      default:
        console.log(`Unhandled event type: ${eventType}`)
    }

    res
      .status(200)
      .json({ success: true, message: 'Webhook processed successfully' })
  } catch (error) {
    console.error('Error handling webhook event:', error)
    res.status(500).json({ message: 'Error handling webhook event' })
  }
}
