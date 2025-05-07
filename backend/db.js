import pkg from "pg";
import dotenv from "dotenv";

const {Pool} = pkg;

export const db = new Pool({
  connectionString: process.env.DATABASE_URL
})