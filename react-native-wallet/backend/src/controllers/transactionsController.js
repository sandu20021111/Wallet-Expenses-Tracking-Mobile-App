import sql from "../config/db.js";

export async function getTransactionsByUserId(req, res) {
  const { userId } = req.params;
  try {
    const transactions =
      await sql`SELECT * FROM transactions WHERE user_id = ${userId}`;
    res.status(200).json(transactions);
  } catch (error) {
    console.log("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
}

export async function createTransaction(req, res) {
  //title, amount, category, user_id
  try {
    const { title, amount, category, user_id } = req.body;

    if (!title || !user_id || !category || !amount === undefined) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const transaction =
      await sql`INSERT INTO transactions (user_id, title, amount, category) VALUES (${user_id}, ${title}, ${amount}, ${category}) RETURNING *`;

    console.log(transaction);
    res.status(201).json(transaction[0]);
  } catch (error) {
    console.log("Error inserting transaction:", error);
    res.status(500).json({ error: "Failed to insert transaction" });
  }
}

export async function deleteTransaction(req, res) {
  const { id } = req.params;

  try {
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ error: "Invalid transaction ID" });
    }

    const result =
      await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`;
    if (result.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.log("Error deleting transaction:", error);
    res.status(500).json({ error: "Failed to delete transaction" });
  }
}

export async function getSummaryByUserId(req, res) {
  const { userId } = req.params;
  try {
    const balanceResult =
      await sql`SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${userId}`;

    const incomeResult =
      await sql`SELECT COALESCE(SUM(amount), 0) as income FROM transactions WHERE user_id = ${userId} AND amount > 0`;

    const expensesResult =
      await sql`SELECT COALESCE(SUM(amount), 0) as expenses FROM transactions WHERE user_id = ${userId} AND amount < 0`;

    const summary = {
      balance: parseFloat(balanceResult[0].balance),
      income: parseFloat(incomeResult[0].income),
      expenses: parseFloat(expensesResult[0].expenses),
    };
    res.status(200).json(summary);
  } catch (error) {
    console.log("Error fetching all transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
}
