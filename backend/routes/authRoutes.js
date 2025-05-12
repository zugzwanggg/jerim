import { Router } from "express";
import {
  isLogged,
  login,
  logout,
  register,
} from "../controllers/authController.js";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.get("/islogged", isLogged);
