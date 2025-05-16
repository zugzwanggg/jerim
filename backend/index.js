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

const allowedOrigins = [
  `${process.env.FRONTEND_BASE_URL}`,
  'https://web.telegram.org',
  'https://telegram.org',
  'https://*.telegram.org'
]
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
        if (allowedOrigins.some(allowed => 
          origin === allowed || 
          origin.endsWith(`.${allowed}`) ||
          origin.includes('web.telegram.org')
        )) {
          return callback(null, true);
        }
      
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    exposedHeaders: ['set-cookie']
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
