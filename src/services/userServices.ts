import { User } from "../models/user"

const create = async ({ firstName, lastName, email, password, userType }: any) => {
    try {
        const user = await User.create({ firstName, lastName, email, password, userType })
        return user
    } catch (error) {
        console.log(error)
    }
}

const getUsersService = async () => {
    const users = await User.findAll()
    return users
}

export const userServices = {
    create, getUsersService
}