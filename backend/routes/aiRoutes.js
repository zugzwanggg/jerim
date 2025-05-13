import { Router } from "express";
import { objectRecognition } from "../controllers/aiController.js";

export const aiRouter = Router();

aiRouter.patch("/ai/object_detection/:report_id", objectRecognition);
