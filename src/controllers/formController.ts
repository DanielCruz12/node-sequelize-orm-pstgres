import { FormServices } from './../services/formServices'
import { Request, Response } from 'express'

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

const getForms = async (req: Request, res: Response) => {
  try {
    const data = await FormServices.getAll()
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const formController = {
  createForm,
  getForms,
}
