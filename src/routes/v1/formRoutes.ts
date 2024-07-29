import { Router } from 'express'
import { formController } from '../../controllers/formController'

const formRoutes = Router()

formRoutes.post('/', formController.createForm)
formRoutes.get('/', formController.getForms)
/* formRoutes.get('/:id', formController.getUser)
formRoutes.put('/:id', formController.updateUser)
formRoutes.delete('/:id', formController.deleteUser) */

export { formRoutes }
