import express from 'express'
import { userRoutes } from './userRoutes'
import { formRoutes } from './formRoutes'
import { formResponseRoutes } from './formResponseRoutes'

const router = express.Router()

//* Mount user-related routes under /users
router.use('/users', userRoutes)

//* Mount form-related routes under /forms
router.use('/forms', formRoutes)

//* Mount form response-related routes under /formResponse
router.use('/formResponse', formResponseRoutes)

export { router as apiRoutes }
