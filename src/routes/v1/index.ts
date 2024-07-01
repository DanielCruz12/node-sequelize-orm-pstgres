import express from 'express';
import { authRoutes } from './authRoutes';

const router = express.Router();

router.use('/auth', authRoutes);

export { router as apiRoutes };
