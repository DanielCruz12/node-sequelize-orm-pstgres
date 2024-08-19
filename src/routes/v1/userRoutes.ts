import { Router } from 'express'
import { usersController } from '../../controllers/usersController'

const userRoutes = Router()

//* Create a new user
userRoutes.post('/', usersController.createUser)

//* Retrieve all users
userRoutes.get('/', usersController.getUsers)

//* Retrieve a specific user by ID
userRoutes.get('/:id', usersController.getUser)

//* Update a user by ID
userRoutes.put('/:id', usersController.updateUser)

//* Delete a user by ID
userRoutes.delete('/:id', usersController.deleteUser)

export { userRoutes }
