import { ShareFormResponseParams } from '../interfaces'
import { Form } from '../models/form'
import { FormResponse } from '../models/formResponse'
import { User } from '../models/user'
import { SavedResponse } from '../models/save'
import { Like } from '../models/like'

const save = async (formResponseData: any) => {
  return await FormResponse.create(formResponseData)
}

const getFormResponseByUserId = async (userId: string) => {
  return await FormResponse.findAll({
    where: { userId },
    include: [{ model: Form, as: 'form' }],
    order: [['createdAt', 'DESC']],
  })
}

const getAllFormCommunity = async () => {
  return await FormResponse.findAll({
    where: { share_status: true },
    include: [
      { model: Form, as: 'form' },
      { model: User, as: 'user' },
      {
        model: Like,
        as: 'likes',
        attributes: ['id', 'userId'],
      },
    ],
    order: [['createdAt', 'DESC']],
  })
}

export const shareFormResponseToCommunity = async ({
  userId,
  formId,
  share_status,
}: ShareFormResponseParams) => {
  const formResponse = await FormResponse.findOne({
    where: { userId, id: formId },
  })

  if (!formResponse) {
    throw new Error('Form response not found')
  }

  formResponse.share_status = share_status
  await formResponse.save()

  return formResponse
}

const deleteResponseId = async (id: string) => {
  const formResponse = await FormResponse.findByPk(id)
  if (formResponse) {
    await formResponse.destroy()
    return formResponse
  }
  return null
}

const addLike = async (userId: string, formResponseId: string) => {
  const existingLike = await Like.findOne({ where: { userId, formResponseId } })
  if (existingLike) {
    throw new Error('User already liked this response')
  }
  return await Like.create({ userId, formResponseId })
}

const removeLike = async (userId: string, formResponseId: string) => {
  const like = await Like.findOne({ where: { userId, formResponseId } })
  if (!like) {
    throw new Error('Like not found')
  }
  await like.destroy()
  return like
}

const saveFormResponse = async (userId: string, formResponseId: string) => {
  const existingSave = await SavedResponse.findOne({
    where: { userId, formResponseId },
  })
  if (existingSave) {
    throw new Error('User already saved this response')
  }
  return await SavedResponse.create({ userId, formResponseId })
}

const getFormSavedResponsesByUser = async (userId: string) => {
  const userExists = await User.findByPk(userId)
  if (!userExists) {
    throw new Error('User not found')
  }

  return await SavedResponse.findAll({
    where: { userId },
    include: [
      {
        model: FormResponse,
        as: 'formResponse',
        include: [
          { model: Form, as: 'form' },
          { model: User, as: 'user' },
        ],
      },
    ],
  })
}

const unsaveFormResponse = async (userId: string, formResponseId: string) => {
  const save = await SavedResponse.findOne({
    where: { userId, formResponseId },
  })
  if (!save) {
    throw new Error('Saved response not found')
  }
  await save.destroy()
  return save
}

export const FormResponseServices = {
  save,
  getFormResponseByUserId,
  shareFormResponseToCommunity,
  getAllFormCommunity,
  deleteResponseId,
  addLike,
  removeLike,
  saveFormResponse,
  unsaveFormResponse,
  getFormSavedResponsesByUser,
}
