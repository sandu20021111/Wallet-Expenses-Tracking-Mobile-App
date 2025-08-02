// db.js
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config(); // ✅ Correct usage

const sql = neon(process.env.DATABASE_URL);

export default sql;
