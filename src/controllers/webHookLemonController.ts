import { Request, Response } from 'express';
import { User } from '../models/user';
import { verifyLemonSqueezyWebhook } from '../utils/verifyLemonSquezzyWebhook';

export const handleLemonSqueezyWebHook = async (req: Request, res: Response) => {
  try {
    // Verify the webhook signature
    const verified = verifyLemonSqueezyWebhook(req);
    if (!verified) {
      return res.status(400).send('Invalid signature');
    }

    const event = req.body;

    if (event.type === 'order_created') {
      const { user_id, amount } = event.data; // Adjust these fields as per Lemon Squeezy's webhook structure

      // Find the user by their ID
      const user = await User.findByPk(user_id);

      if (user) {
        // Update user's total donations and last donation date
        user.totalDonations += parseFloat(amount);
        user.lastDonationAt = new Date();
        await user.save();

        return res.status(200).json({ message: 'Donation recorded successfully' });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } else {
      return res.status(400).json({ message: 'Unsupported event type' });
    }
  } catch (error) {
    console.error('Webhook handling failed:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
