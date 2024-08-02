import { Router } from 'express'
import { formResponseController } from '../../controllers/formResponseController'

const formResponseRoutes = Router()

formResponseRoutes.post('/', formResponseController.createFormResponse)

export { formResponseRoutes }
