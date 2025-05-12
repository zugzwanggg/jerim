import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db } from "../db.js";

export const register = async (req, res) => {
  try {
    res.status(200).send({
      message: "Hi",
    });
  } catch (error) {
    console.log(`Error at register(): ${error}`);
    res.status(500).send({
      error,
    });
  }
};
