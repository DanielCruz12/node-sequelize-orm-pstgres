import { Router } from 'express'
import { formController } from '../../controllers/formController'

const formRoutes = Router()
//* Create a new form
formRoutes.post('/', formController.createForm)

//* Retrieve all forms
formRoutes.get('/', formController.getForms)

//* Update a form by ID
formRoutes.put('/:id', formController.updateForm)

//* Delete a form by ID
formRoutes.delete('/:id', formController.deleteForm)

export { formRoutes }
