import { Request, Response } from "express"
import { userServices } from "../services/userServices"

const createUser = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, userType } = req.body
    try {
        const data = await userServices.create({ firstName, lastName, email, password, userType })
        res.status(201).json({ "message": "usuario creado", data })
    } catch (error) {
        console.log(error)
    }
}
const getUsers = async (req: Request, res: Response) => {

}
const getUser = async (req: Request, res: Response) => {

}

export const usersController = {
    getUser, createUser, getUsers
}