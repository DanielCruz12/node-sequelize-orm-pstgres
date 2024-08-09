import { Router } from 'express'
import { formResponseController } from '../../controllers/formResponseController'

const formResponseRoutes = Router()

formResponseRoutes.post('/', formResponseController.createFormResponse)
formResponseRoutes.get('/community', formResponseController.getFormResponsesCommunity)
formResponseRoutes.post('/share-community', formResponseController.shareFormResponseToCommunityController)
formResponseRoutes.get('/:id', formResponseController.getFormsByUser)

export { formResponseRoutes }
