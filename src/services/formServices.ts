import { Form } from '../models/form'
import { FormField } from '../models/formField'

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

const getAll = async () => {
  try {
    const forms = await Form.findAll({
      attributes: [
        'id',
        'name',
        'description',
        'icon',
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
    })

    return forms.map(formatFormResponse)
  } catch (error) {
    console.error('Error fetching forms:', error)
    throw new Error('Error fetching forms')
  }
}

const formatFormResponse = ({
  id,
  name,
  description,
  icon,
  category,
  slug,
  aiPrompt,
  fields,
}: any) => ({
  icon,
  name,
  desc: description,
  id,
  category,
  slug,
  aiPrompt,
  form: fields.map(formatFieldResponse),
})

const formatFieldResponse = ({
  id,
  label,
  fieldType,
  name,
  required,
  placeholder,
}: any) => ({
  id,
  label,
  field: fieldType,
  name,
  required,
  placeholder,
})

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
