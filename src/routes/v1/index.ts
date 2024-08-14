import express from 'express'
import { userRoutes } from './userRoutes'
import { formRoutes } from './formRoutes'
import { formResponseRoutes } from './formResponseRoutes'

const router = express.Router()

router.use('/users', userRoutes)
router.use('/forms', formRoutes)
router.use('/formResponse', formResponseRoutes)

export { router as apiRoutes }
