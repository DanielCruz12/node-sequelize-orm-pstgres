import { Router } from 'express'
import { formResponseController } from '../../controllers/formResponseController'

const formResponseRoutes = Router()

formResponseRoutes.post('/', formResponseController.createFormResponse)
formResponseRoutes.get(
  '/community',
  formResponseController.getFormResponsesCommunity,
)
formResponseRoutes.post(
  '/share-community',
  formResponseController.shareFormResponseToCommunityController,
)
formResponseRoutes.get('/:id', formResponseController.getFormsByUser)
formResponseRoutes.delete('/:id', formResponseController.deleteByResponseId)

//* Route to like/unlike a form response
formResponseRoutes.post('/like', formResponseController.likeFormResponse)
formResponseRoutes.post('/unlike', formResponseController.unlikeFormResponse)

//* Route to save/unsave a form response
formResponseRoutes.post('/save', formResponseController.saveFormResponse)
formResponseRoutes.get(
  '/saved/:userId',
  formResponseController.getFormSavedResponsesByUser,
)
formResponseRoutes.post('/unsave', formResponseController.unsaveFormResponse)

export { formResponseRoutes }
