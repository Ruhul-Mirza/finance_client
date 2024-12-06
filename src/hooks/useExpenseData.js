import { useState, useEffect } from 'react';

export function useExpenseData() {
  const [expenseData, setExpenseData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedExpense, setEditedExpense] = useState({});
  const [selectHome, setSelectHome] = useState('own');
  const token = localStorage.getItem('userdatatoken');

  useEffect(() => {
    fetchExpenseData();
  }, []);

  const fetchExpenseData = async () => {
    try {
      const response = await fetch('http://localhost:6999/expense', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authenticate: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      setExpenseData(result);
    } catch (error) {
      console.error('Error fetching expense data:', error);
    }
  };

  const handleEdit = (index, expense) => {
    setEditIndex(index);
    setEditedExpense({ ...expense });
    setSelectHome(expense.home);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedExpense((prev) => ({ ...prev, [name]: value }));

    if (name === 'home') {
      setSelectHome(value);
      setEditedExpense((prev) => ({
        ...prev,
        rentAmount: value === 'own' ? '0' : prev.rentAmount,
      }));
    }
  };

  const handleSave = async (expenseId, userId) => {
    const total =
      parseFloat(editedExpense.rentAmount || '0') +
      parseFloat(editedExpense.foodAmount || '0') +
      parseFloat(editedExpense.entertainmentAmount || '0') +
      parseFloat(editedExpense.utilitiesAmount || '0') +
      parseFloat(editedExpense.personalAmount || '0') +
      parseFloat(editedExpense.othersAmount || '0');

    if (total > parseFloat(editedExpense.monthlyAmount || '0')) {
      alert('Your total expenses exceed your monthly salary.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:6999/expense/${expenseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authenticate: `Bearer ${token}`,
        },
        body: JSON.stringify({
          expenses: editedExpense,
        }),
      });
      await response.json();

      setExpenseData((prevData) =>
        prevData.map((user) =>
          user._id === userId
            ? {
                ...user,
                expenses: user.expenses.map((exp) =>
                  exp._id === expenseId ? { ...exp, ...editedExpense } : exp
                ),
              }
            : user
        )
      );

      setEditIndex(null);
    } catch (error) {
      console.error('Error updating expense data:', error);
    }
  };

  const handleDelete = async (expenseId, userId) => {
    const confirmation = window.confirm('Are you sure you want to delete this expense?');
    if (confirmation) {
      try {
        await fetch(`http://localhost:6999/expense/${expenseId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authenticate: `Bearer ${token}`,
          },
        });

        setExpenseData((prevData) =>
          prevData.map((user) =>
            user._id === userId
              ? {
                  ...user,
                  expenses: user.expenses.filter((exp) => exp._id !== expenseId),
                }
              : user
          )
        );
      } catch (error) {
        console.error('Error deleting expense:', error);
      }
    }
  };

  return {
    expenseData,
    editIndex,
    editedExpense,
    selectHome,
    handleEdit,
    handleChange,
    handleSave,
    handleDelete,
    setEditIndex,
  };
}
