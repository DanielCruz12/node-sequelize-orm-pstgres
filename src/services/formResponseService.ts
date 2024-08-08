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
  })
}

const getAllFormCommunity = async () => {
  return await FormResponse.findAll({
    where: { share_status: true },
    include: [
      { model: Form, as: 'form' },
      { model: User, as: 'user' },
    ],
  })
}

/* const getById = async (id: string) => {
    return await User.findByPk(id);
};

const update = async (id: string, userData: any) => {
    const user = await User.findByPk(id);
    if (user) {
        return await user.update(userData);
    }
    return null;
};

const deleteUser = async (id: string) => {
    const user = await User.findByPk(id);
    if (user) {
        await user.destroy();
        return user;
    }
    return null;
}; */

export const FormResponseServices = {
  save,
  getFormResponseByUserId,
  getAllFormCommunity,
  /*  getAll,
    getById,
    update,
    deleteUser */
}
