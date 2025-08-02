import express from "express";
import dotenv from "dotenv";
import sql from "./config/db.js"; // ✅ Correct for default export

dotenv.config();

const app = express();

//middleware
app.use(express.json());

//custom simple middleware
//app.use((req, res, next) => {
//console.log("Hey we hit a req, the method is", req.method);
//next();
//});

const PORT = process.env.PORT || 5001;

async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions (id SERIAL PRIMARY KEY, user_id VARCHAR(255) NOT NULL, title VARCHAR(255) NOT NULL, amount DECIMAL(10, 2) NOT NULL, category VARCHAR(225) NOT NULL, created_at DATE NOT NULL DEFAULT CURRENT_DATE)`; // Test the connection
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit the process if the connection fails
  }
}

app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

app.post("/api/transactions", async (req, res) => {
  //title, amount, category, user_id
  try {
    const { title, amount, category, user_id } = req.body;
    const result =
      await sql`INSERT INTO transactions (title, amount, category, user_id) VALUES (${title}, ${amount}, ${category}, ${user_id}) RETURNING *`;
    res.status(201).json(result[0]);
  } catch (error) {
    console.error("Error inserting transaction:", error);
    res.status(500).json({ error: "Failed to insert transaction" });
  }
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
  });
});
