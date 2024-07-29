import { FormServices } from './../services/formServices'
import { Request, Response } from 'express'

const createForm = async (req: Request, res: Response) => {
   const { userId, name, description, icon, category, slug, aiPrompt } = req.body
  try {
    const data = await FormServices.create({
     userId, name, description, icon, category, slug, aiPrompt
    })
    res.status(201).json({ message: 'Form created successfully', data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getForms = async (req: Request, res: Response) => {
  try {
    const data = await FormServices.getAll()
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
/* 
const getUser = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const data = await FormServices.getById(id)
    if (!data) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const { firstName, lastName, email, userType } = req.body
  try {
    const data = await FormServices.update(id, {
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

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const data = await FormServices.deleteForm(id)
    if (!data) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
} */

export const formController = {
  createForm,
  getForms,
  /*  getUser,
  updateUser,
  deleteUser, */
}
