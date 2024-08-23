import { FormServices } from './../services/formServices'
import { Request, Response } from 'express'

//? Create a new form
const createForm = async (req: Request, res: Response) => {
  const { userId, name, description, icon, category, slug, aiPrompt, fields } =
    req.body
  try {
    const data = await FormServices.create({
      userId,
      name,
      description,
      icon,
      category,
      slug,
      aiPrompt,
      fields,
    })
    res.status(201).json({ message: 'Form created successfully', data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

//? Retrieve all forms
const getForms = async (req: Request, res: Response) => {
  try {
    const data = await FormServices.getAll()
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

//? Retrieve a specific form by ID
const getFormById = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const data = await FormServices.getById(id)
    if (!data) {
      return res.status(404).json({ message: 'Form not found' })
    }
    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching form:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

//? Update a form by ID
const updateForm = async (req: Request, res: Response) => {
  const { id } = req.params
  const { userId, name, description, icon, category, slug, isApproved, aiPrompt, fields } =
    req.body

  try {
    const data = await FormServices.update(id, {
      userId,
      name,
      description,
      icon,
      isApproved,
      category,
      slug,
      aiPrompt,
      fields,
    })
    if (!data) {
      return res.status(404).json({ message: 'Form not found' })
    }
    res.status(200).json({ message: 'Form updated successfully', data })
  } catch (error) {
    console.error('Error updating form:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

//? Delete a form by ID
const deleteForm = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const success = await FormServices.deleteForm(id)
    if (!success) {
      return res.status(404).json({ message: 'Form not found' })
    }
    res.status(200).json({ message: 'Form deleted successfully' })
  } catch (error) {
    console.error('Error deleting form:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const formController = {
  createForm,
  getForms,
  updateForm,
  getFormById,
  deleteForm,
}
