import { Router } from "express";
import { usersController } from "../../controllers/usersController";

const userRoutes = Router()
userRoutes.post("/", usersController.createUser)
userRoutes.get("/", usersController.getUsers)
userRoutes.post("/:id", usersController.getUser)

export { userRoutes }