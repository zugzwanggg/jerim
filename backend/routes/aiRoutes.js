import { Router } from "express";
import { objectRecognition } from "../controllers/aiController.js";

export const aiRouter = Router();

aiRouter.get("/ai/:report_id/object_detection", objectRecognition);
