import express from 'express';
import { authRoutes } from './authRoutes';
import { userRoutes } from './userRoutes';
import { formRoutes } from './formRoutes';
import { handleWebhook } from '../../controllers/webHookController';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/forms', formRoutes);
router.use('/users', userRoutes);

router.post('/webhooks' ,handleWebhook)

export { router as apiRoutes };
