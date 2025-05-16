import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRouter } from "./routes/authRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import { mapRoute } from "./routes/mapRoute.js";
import { aiRouter } from "./routes/aiRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 
    [
      `${process.env.FRONTEND_BASE_URL}`,
      'https://t.me',
      'https://web.telegram.org'
    ],
    credentials: true,
  })
);

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", mapRoute);
app.use("/api", aiRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server is succesfully running");
});
