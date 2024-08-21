import crypto from 'crypto'
import { Request } from 'express'

export const verifyLemonSqueezyWebhook = (req: Request) => {
  const signature = req.headers['lemon-signature'] as string
  const secret = process.env.LEMON_SQUEEZY_SECRET_KEY as string

  const hash = crypto
    .createHmac('sha256', secret)
    .update(req.body)
    .digest('hex')

  return hash === signature
}
