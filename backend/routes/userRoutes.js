import { Router } from "express";
import {
  editAvatar,
  editUsername,
  getGlobalLeaderboard,
  getRecentActivity,
  getUserByID,
  searchUsers,
} from "../controllers/userController.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { uploadImage } from "../middleware/uploadImage.js";

export const userRouter = Router();

userRouter.get("/user/:user_id", getUserByID);
userRouter.patch("/user/:user_id/edit_username", checkAuth, editUsername);
userRouter.patch(
  "/user/:user_id/edit_avatar",
  checkAuth,
  uploadImage.single("avatar"),
  editAvatar
);
userRouter.get("/user/:user_id/recent_activity", getRecentActivity);
userRouter.get("/leaderboard", getGlobalLeaderboard);
userRouter.get("/search", searchUsers);
