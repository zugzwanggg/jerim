import { Router } from "express";
import { getUserByID } from "../controllers/userController.js";

export const userRouter = Router();

userRouter.get("/user/:user_id", getUserByID);
