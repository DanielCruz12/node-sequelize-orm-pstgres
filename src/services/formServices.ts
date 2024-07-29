import { Form } from '../models/form'

const create = async (userData: any) => {
  return await Form.create(userData)
}

const getAll = async () => {
  return await Form.findAll()
}

const getById = async (id: string) => {
  return await Form.findByPk(id)
}

const update = async (id: string, formData: any) => {
  const form = await Form.findByPk(id)
  if (form) {
    return await form.update(formData)
  }
  return null
}

const deleteForm = async (id: string) => {
  const form = await Form.findByPk(id)
  if (form) {
    await form.destroy()
    return form
  }
  return null
}

export const FormServices = {
  create,
  getAll,
  getById,
  update,
  deleteForm,
}
