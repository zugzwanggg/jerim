import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: `${process.env.FRONTEND_BASE_URL}`,
  credentials: true
}))

const PORT = process.env.PORT || 8080

app.listen(PORT, ()=> {
  console.log('Server is succesfully running');
})