import { Router } from "express";

const authRoutes = Router()
authRoutes.get("/", () => { console.log("first") })

export { authRoutes }