// db.js
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config(); // ✅ Correct usage

const sql = neon(process.env.DATABASE_URL);

export async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions (id SERIAL PRIMARY KEY, user_id VARCHAR(255) NOT NULL, title VARCHAR(255) NOT NULL, amount DECIMAL(10, 2) NOT NULL, category VARCHAR(225) NOT NULL, created_at DATE NOT NULL DEFAULT CURRENT_DATE)`; // Test the connection
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit the process if the connection fails
  }
}

export default sql;
