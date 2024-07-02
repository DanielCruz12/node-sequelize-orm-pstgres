import { User } from "../models/user"

const create = async ({ firstName, lastName, email, password, userType }: any) => {
    try {
        const user = await User.create({ firstName, lastName, email, password, userType })
        return user
    } catch (error) {
        console.log(error)
    }
}

export const userServices = {
    create
}