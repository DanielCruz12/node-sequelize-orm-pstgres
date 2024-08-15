import { ShareFormResponseParams } from '../interfaces'
import { Form } from '../models/form'
import { FormResponse } from '../models/formResponse'
import { User } from '../models/user'

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

/* const update = async (id: string, userData: any) => {
    const user = await User.findByPk(id);
    if (user) {
        return await user.update(userData);
    }
    return null;
};
 */

export const FormResponseServices = {
  save,
  getFormResponseByUserId,
  shareFormResponseToCommunity,
  getAllFormCommunity,
  deleteResponseId,
  /*  getAll,
    getById,
    update,
    deleteUser */
}
