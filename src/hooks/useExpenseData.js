import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:6999';

export function useExpenseData() {
  const [expenseData, setExpenseData] = useState([]);
  const token = localStorage.getItem("userdatatoken");

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };

  useEffect(() => {
    fetchExpenseData();
  }, []);

  const fetchExpenseData = async () => {
    try {
      const response = await fetch(`${API_URL}/expense`, {
        method: "GET",
        headers,
      });
      if (!response.ok) throw new Error("Failed to fetch expenses");
      const result = await response.json();
      setExpenseData(result);
    } catch (error) {
      console.error("Error fetching expense data:", error);
    }
  };

  return {
    expenseData,
  };
}
