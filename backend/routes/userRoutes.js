import { Router } from "express";
import { editUsername, getUserByID } from "../controllers/userController.js";

export const userRouter = Router();

userRouter.get("/user/:user_id", getUserByID);
userRouter.patch("/user/edit_username/:user_id", editUsername);
