import { useState, useEffect, useCallback } from "react";

const API_URL = "https://localhost:5001/api";

export const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ balance: 0, income: 0, expense: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions?user_id=${userId}`);
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Failed to fetch transactions");

      setTransactions(data);
    } catch (err) {
      setError(err.message);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_URL}/transactions/summary?user_id=${userId}`
      );
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Failed to fetch summary");

      setSummary(data);
    } catch (err) {
      setError(err.message);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);
    try {
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (err) {
      console.error("Error loading data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  const deleteTransaction = useCallback(
    async (transactionId) => {
      if (!transactionId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_URL}/transactions/${transactionId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to delete transaction");
        }

        await loadData();
      } catch (err) {
        console.error("Error deleting transaction:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [loadData]
  );

  const updateTransaction = useCallback(
    async (transactionId, updatedData) => {
      if (!transactionId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_URL}/transactions/${transactionId}`,
          {
            method: "PUT", // or PATCH depending on your API
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
          }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to update transaction");
        }

        await loadData();
      } catch (err) {
        console.error("Error updating transaction:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [loadData]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    transactions,
    loading,
    error,
    summary,
    loadData,
    deleteTransaction,
    updateTransaction,
  };
};
