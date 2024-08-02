import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { Webhook } from 'svix'
import { apiRoutes } from './routes/v1'

dotenv.config()

//* Create an Express application
const app = express()

//* Middleware to parse JSON bodies
app.use(express.json())
app.use(cors())

//* Define routes
app.use('/api/v1', apiRoutes)


app.post(
  '/api/webhooks',
  // This is a generic method to parse the contents of the payload.
  // Depending on the framework, packages, and configuration, this may be
  // different or not required.
  bodyParser.raw({ type: 'application/json' }),
  async function (req, res) {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
    if (!WEBHOOK_SECRET) {
      throw new Error('You need a WEBHOOK_SECRET in your .env')
    }

    // Get the headers and body
    const headers = req.headers
    const payload = req.body

    // Get the Svix headers for verification
    const svix_id = headers['svix-id'] as string
    const svix_timestamp = headers['svix-timestamp'] as string
    const svix_signature = headers['svix-signature'] as string

    // If there are no Svix headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response('Error occured -- no svix headers', {
        status: 400,
      })
    }

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET)

    let evt: any = null

    // Attempt to verify the incoming webhook
    // If successful, the payload will be available from 'evt'
    // If the verification fails, error out and  return error code
    try {
      evt = wh.verify(payload, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      })
    } catch (err: any) {
      console.log('Error verifying webhook:', err.message)
      return res.status(400).json({
        success: false,
        message: err.message,
      })
    }

    // Do something with the payload
    // For this guide, you simply log the payload to the console
    const { id } = evt.data
    const eventType = evt.type
    console.log(`Webhook with an ID of ${id} and type of ${eventType}`)
    console.log('Webhook body:', evt.data)

    return res.status(200).json({
      success: true,
      message: 'Webhook received',
    })
  },
)

//* Fallback route for undefined endpoints
app.use('/api/v1', (req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

export default app
