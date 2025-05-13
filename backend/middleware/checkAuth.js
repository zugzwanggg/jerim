import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET
  ? process.env.JWT_SECRET
  : "default_secret_123";

export const checkAuth = async (req,res, next) => {
  try {

    const {token} = req.cookies;
    if (!token) return res.status(403).json({
      message: "Unauthorized"
    })

    const verify = jwt.verify(token, JWT_SECRET);

    req.user = verify;

    next();
    
  } catch (error) {
    console.log('Error at checkAuth', error);
    res.status(500).send(error)
  }
}