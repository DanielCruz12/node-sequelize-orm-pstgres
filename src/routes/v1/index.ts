import express from 'express';
import { authRoutes } from './authRoutes';
import { userRoutes } from './userRoutes';
import { formRoutes } from './formRoutes';
import { handleWebhook } from '../../controllers/webHookController';
import bodyParser from "body-parser";

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/forms', formRoutes);
router.use('/users', userRoutes);
router.use('/webhook/create', bodyParser.raw({ type: "application/json" }) ,handleWebhook)

export { router as apiRoutes };
