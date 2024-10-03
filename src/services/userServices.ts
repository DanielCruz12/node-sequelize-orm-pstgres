import { Form } from "../models/form";
import { User } from "../models/user";

//? This will create a new user
const create = async (userData: any) => {
    return await User.create(userData);
};

//? This will get all users with their forms
const getAll = async () => {
    return await User.findAll({
        attributes: ['id', 'email', 'name', 'userType'],
        order: [['createdAt', 'DESC']],
    });
};

//? This will get a single user by id
const getById = async (id: string) => {
    return await User.findByPk(id);
};

//? This will update a user by id
const update = async (id: string, userData: any) => {
    const user = await User.findByPk(id);
    if (user) {
        return await user.update(userData);
    }
    return null;
};

//? This will delete a user by id
const deleteUser = async (id: string) => {
    const user = await User.findByPk(id);
    if (user) {
        await user.destroy();
        return user;
    }
    return null;
};

export const userServices = {
    create,
    getAll,
    getById,
    update,
    deleteUser
};
