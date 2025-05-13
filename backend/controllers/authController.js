import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { db } from "../db.js";
import validator from "validator";

const JWT_SECRET = process.env.JWT_SECRET
  ? process.env.JWT_SECRET
  : "default_secret_123";

const sevenDays = 7 * 24 * 60 * 60 * 1000;

export const register = async (req, res) => {
  try {
    const { email, username, password, repeat_password } = req.body;

    if (!email || !username || !password || !repeat_password) {
      return res.status(400).send({
        error_message: "All fields must be provided",
      });
    }

    const checkIfUserExists = await db.query(
      "SELECT * FROM users WHERE OR email=$1",
      [email]
    );

    if (checkIfUserExists.rows.length > 0) {
      return res.status(400).send({
        error_message: "This email is already in use",
      });
    }

    if (password !== repeat_password) {
      return res.status(400).send({
        error_message: "password and repeat_password are not matching",
      });
    }

    const isPasswordStrong = validator.isStrongPassword(password, {
      minLength: 6,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });

    if (!isPasswordStrong) {
      return res.status(400).send({
        error_message: "Weak Password",
      });
    }

    const genSalt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, genSalt);

    const defaultAvatar = `https://res.cloudinary.com/dtsdbjvgg/image/upload/t_default-avatar/v1745933665/ChatGPT_Image_29_%D0%B0%D0%BF%D1%80._2025_%D0%B3._18_35_39_o3vfxl.png`;

    const newUser = await db.query(
      "INSERT INTO users (email, username, password, avatar) VALUES ($1, $2, $3, $4) RETURNING id, email, username, avatar, created_at",
      [email, username, hashedPassword, defaultAvatar]
    );

    const payload = newUser.rows[0];
    const token = jwt.sign(payload, JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: sevenDays,
      // sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
    });

    return res.status(200).send({
      message: "User created succesfully",
      user_id: payload.id,
    });
  } catch (error) {
    console.log(`Error at register(): ${error}`);
    return res.status(500).send({
      error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { user_data, password } = req.body;

    if (!user_data || !password) {
      return res.status(400).send({
        error_message: "All fields must be provided",
      });
    }

    const checkIfUserExists = await db.query(
      "SELECT * FROM users WHERE username=$1 OR email=$1",
      [user_data]
    );

    if (checkIfUserExists.rows.length <= 0) {
      return res.status(401).send({
        error_message: "Incorrect username, email or password",
      });
    }

    const checkUserPassword = await bcryptjs.compare(
      password,
      checkIfUserExists.rows[0].password
    );

    if (!checkUserPassword) {
      return res.status(401).send({
        error_message: "Incorrect username, email or password",
      });
    }

    const payload = checkIfUserExists.rows[0];
    const token = jwt.sign(payload, JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: sevenDays,
      // sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
    });

    return res.status(200).send({
      message: "Logged in succesfully",
      user_id: payload.id,
    });
  } catch (error) {
    console.log(`Error at login(): ${error}`);
    return res.status(500).send({
      error,
    });
  }
};

export const logout = async (req, res) => {
  return res
    .cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: new Date(0),
      // sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
    })
    .status(200)
    .send({
      message: "Logged out succesfully",
    });
};

export const isLogged = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send({
        isLogged: false,
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    return res.status(200).send({
      isLogged: true,
      user: decoded,
    });
  } catch (error) {
    console.log(`Error at isLogged(): ${error}`);
    return res.status(500).send({
      error,
    });
  }
};
