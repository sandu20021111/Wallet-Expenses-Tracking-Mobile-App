import express from "express";
import sql from "../config/db.js";
import {
  createTransaction,
  deleteTransaction,
  getSummaryByUserId,
  getTransactionsByUserId,
} from "../controllers/transactionsController.js";

const router = express.Router();

// ✅ Pass function reference, not a call
router.get("/:userId", getTransactionsByUserId);

router.post("/", createTransaction);

router.delete("/:id", deleteTransaction);

router.get("/summary/:userId", getSummaryByUserId);

export default router;
