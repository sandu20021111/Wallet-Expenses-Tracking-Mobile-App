import express from "express";
import sql from "../config/db.js";
import {
  createTransaction,
  deleteTransaction,
  getSummaryByUserId,
  getTransactionsByUserId,
  updateTransaction, // <-- import the new controller
} from "../controllers/transactionsController.js";

const router = express.Router();

// ✅ Pass function reference, not a call
router.get("/:userId", getTransactionsByUserId);

router.post("/", createTransaction);

router.delete("/:id", deleteTransaction);

router.put("/:id", updateTransaction); // <-- Add PUT route for update

router.get("/summary/:userId", getSummaryByUserId);

export default router;
