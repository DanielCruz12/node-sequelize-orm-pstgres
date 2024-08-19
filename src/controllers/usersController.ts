import { Request, Response } from 'express'
import { userServices } from '../services/userServices'

//? This will create and save into the db an user using the Webhook of Clerk
const createUser = async (req: Request, res: Response) => {
  const { email, id, name } = req.body
  try {
    const data = await userServices.create({
      email,
      id,
      name,
    })
    res.status(201).json({ message: 'User created successfully', data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

//? This will get all the users from the db
const getUsers = async (req: Request, res: Response) => {
  try {
    const data = await userServices.getAll()
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

//? This will get a single user by its id from the db
const getUser = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const data = await userServices.getById(id)
    if (!data) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

//? This will update a single user by its id in the db  F
const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const { firstName, lastName, email, userType } = req.body
  try {
    const data = await userServices.update(id, {
      firstName,
      lastName,
      email,
      userType,
    })
    if (!data) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: 'User updated successfully', data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

//? This will delete a single user by its id from the db
const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const data = await userServices.deleteUser(id)
    if (!data) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const usersController = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
}
