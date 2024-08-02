import express from 'express';
import { authRoutes } from './authRoutes';
import { userRoutes } from './userRoutes';
import { formRoutes } from './formRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/forms', formRoutes);
router.use('/users', userRoutes);

export { router as apiRoutes };
