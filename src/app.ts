import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { Webhook } from 'svix'
import { apiRoutes } from './routes/v1'
import bodyParser from 'body-parser'
import { handleWebHook } from './controllers/webHookController'

dotenv.config()

//* Create an Express application
const app = express()

//* Middleware to parse JSON bodies
app.use(cors())

//* Define routes
app.use('/api/v1', apiRoutes)

app.post(
  '/api/webhooks',
  bodyParser.raw({ type: 'application/json' }),
  handleWebHook,
)

//* Fallback route for undefined endpoints
app.use('/api/v1', (req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

export default app
