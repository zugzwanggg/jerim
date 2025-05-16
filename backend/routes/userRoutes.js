import { Router } from "express";
import {
  editAvatar,
  editUsername,
  getGlobalLeaderboard,
  getLeaderboardPosition,
  getRecentActivity,
  getUserByID,
  getUserPlants,
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
userRouter.get("/user/:user_id/get_plants", getUserPlants);
userRouter.get("/user/:user_id/leaderboard", getLeaderboardPosition);
userRouter.get("/leaderboard", getGlobalLeaderboard);
