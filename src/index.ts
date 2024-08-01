import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { apiRoutes } from './routes/v1'
import sequelize from './database/dataBase'
import { Webhook } from 'svix'
import bodyParser from 'body-parser'
import { buffer } from 'micro'

dotenv.config()

//* Create an Express application
const app = express()

//* Middleware to parse JSON bodies
app.use(express.json())
app.use(cors())
app.use('/api/v1', apiRoutes)

app.use('/api/v1', (req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.post(
  '/api/webhooks',
  bodyParser.raw({ type: 'application/json' }),
  async (req, res) => {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
    if (!WEBHOOK_SECRET) {
      console.error('WEBHOOK_SECRET is missing in .env')
      return res.status(500).json({ message: 'Internal server error' })
    }

    const headers = req.headers
    const payload = (await buffer(req)).toString()

    const svix_id = headers['svix-id'] as string
    const svix_timestamp = headers['svix-timestamp'] as string
    const svix_signature = headers['svix-signature'] as string

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).json({ message: 'Missing svix headers' })
    }

    const wh = new Webhook(WEBHOOK_SECRET)
    let evt: any

    try {
      evt = wh.verify(payload, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      })
    } catch (err: any) {
      console.error('Error verifying webhook:', err.message)
      return res.status(400).json({ success: false, message: err.message })
    }

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

const port = process.env.PORT || 3000

sequelize
  .sync()
  .then(() => {
    console.log('Database synced')
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })
