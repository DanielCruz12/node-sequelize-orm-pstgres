import { Router } from 'express'
import { formResponseController } from '../../controllers/formResponseController'

const formResponseRoutes = Router()
//* Create a new form response
formResponseRoutes.post('/', formResponseController.createFormResponse)

//* Retrieve form responses shared with the community
formResponseRoutes.get(
  '/community',
  formResponseController.getFormResponsesCommunity,
)

//* Share a form response to the community
formResponseRoutes.post(
  '/share-community',
  formResponseController.shareFormResponseToCommunityController,
)

//* Retrieve form responses by user ID
formResponseRoutes.get('/:id', formResponseController.getFormsByUser)

//* Delete a form response by response ID
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
