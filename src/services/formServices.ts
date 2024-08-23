import { Form } from '../models/form'
import { FormField } from '../models/formField'
import { FormResponse } from '../models/formResponse'
import { formatFormResponse } from '../utils'

//? This will create a Form
const create = async (formData: any) => {
  const { fields, ...formDetails } = formData

  const form: any = await Form.create(formDetails)

  if (fields && fields.length) {
    const formFields = fields.map((field: any) => ({
      ...field,
      formId: form.id,
    }))
    await FormField.bulkCreate(formFields)
  }

  return form
}

//? This will get all Forms
const getAll = async () => {
  try {
    const forms = await Form.findAll({
      where: { isApproved: true },
      attributes: [
        'id',
        'name',
        'description',
        'icon',
        'isRecommended',
        'isApproved',
        'category',
        'slug',
        'aiPrompt',
      ],
      include: [
        {
          model: FormField,
          as: 'fields',
          attributes: [
            'id',
            'label',
            'fieldType',
            'name',
            'required',
            'placeholder',
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    })

    return forms.map(formatFormResponse)
  } catch (error) {
    console.error('Error fetching forms:', error)
    throw new Error('Error fetching forms')
  }
}

//? this will getById a Form
const getById = async (id: string) => {
  return await Form.findByPk(id)
}

//? this will update a Form by id
const update = async (id: string, formData: any) => {
  const form = await Form.findByPk(id)
  if (form) {
    return await form.update(formData)
  }
  return null
}

//? this will delete a Form by id
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
