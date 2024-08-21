import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { apiRoutes } from './routes/v1'
import { handleWebHook } from './controllers/webHookController'
import { handleLemonSqueezyWebHook } from './controllers/webHookLemonController'

dotenv.config()

//* Create an Express application
const app = express()

//* Middleware to parse JSON bodies
app.use(cors())

app.post(
  '/api/webhooks',
  bodyParser.raw({ type: 'application/json' }),
  handleWebHook,
)

app.post(
  '/api/v1/webhook/payment/order',
  bodyParser.raw({ type: 'application/json' }),  // Use raw body for webhook verification
  handleLemonSqueezyWebHook,
);
app.use(express.json())

//* Define routes
app.use('/api/v1', apiRoutes)

//* Fallback route for undefined endpoints
app.use('/api/v1', (req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

export default app
