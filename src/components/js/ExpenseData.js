import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const ExpenseData = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedExpense, setEditedExpense] = useState({});
  const [selectHome, setSelectHome] = useState("own");
  const token = localStorage.getItem("userdatatoken");

  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
  ];

  const homes = ["own", "rent"];

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const response = await fetch("http://localhost:6999/expense", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authenticate: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setExpenseData(result);
      } catch (error) {
        console.error("Error fetching expense data:", error);
      }
    };

    fetchExpenseData();
  }, [token]);

  const handleEdit = (index, expense) => {
    setEditIndex(index);
    setEditedExpense({ ...expense });
    setSelectHome(expense.home);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedExpense((prev) => ({ ...prev, [name]: value }));

    if (name === "home") {
      setSelectHome(value);
      setEditedExpense((prev) => ({
        ...prev,
        rentAmount: value === "own" ? "0" : prev.rentAmount,
      }));
    }
  };

  const handleSave = async (expenseId, userId) => {
    const total = (
      parseFloat(editedExpense.home || 0) +
      parseFloat(editedExpense.rentAmount || 0) +
      parseFloat(editedExpense.foodAmount || 0) +
      parseFloat(editedExpense.entertainmentAmount || 0) +
      parseFloat(editedExpense.utilitiesAmount || 0) +
      parseFloat(editedExpense.personalAmount || 0) +
      parseFloat(editedExpense.othersAmount || 0)
    );

    if (total > parseFloat(editedExpense.monthlyAmount || 0)) {
      alert("Your total expenses exceed your monthly salary.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:6999/expense/${expenseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authenticate: `Bearer ${token}`,
        },
        body: JSON.stringify({
          expenses: editedExpense,
        }),
      });
      const updatedUser = await response.json();

      setExpenseData((prevData) =>
        prevData.map((user) =>
          user._id === userId
            ? {
                ...user,
                expenses: user.expenses.map((exp) =>
                  exp._id === expenseId ? { ...editedExpense } : exp
                ),
              }
            : user
        )
      );

      setEditIndex(null);
    } catch (error) {
      console.error("Error updating expense data:", error);
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedExpense({});
  };

  const handleDelete = (expenseId, userId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (confirmation) {
      fetch(`http://localhost:6999/expense/${expenseId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authenticate: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setExpenseData((prevData) =>
            prevData.map((user) =>
              user._id === userId
                ? {
                    ...user,
                    expenses: user.expenses.filter(
                      (exp) => exp._id !== expenseId
                    ),
                  }
                : user
            )
          );
        })
        .catch((error) => {
          console.error("Error deleting expense:", error);
        });
    }
  };

  return (
    <div>
      <h2>Expenses Data</h2>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Home</th>
            <th>Rent</th>
            <th>Food</th>
            <th>Entertainment</th>
            <th>Utilities</th>
            <th>Personal</th>
            <th>Others</th>
            <th>Monthly Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenseData.map((user, userIndex) =>
            user.expenses.map((expense, expenseIndex) => {
              return (
                <tr key={expense._id}>
                  {editIndex === expenseIndex ? (
                    <>
                      <td>
                        <select
                          name="month"
                          value={editedExpense.month || ""}
                          onChange={handleChange}
                          disabled
                        >
                          {months.map((month, index) => (
                            <option key={index} value={month}>
                              {month}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          name="home"
                          value={editedExpense.home}
                          onChange={handleChange}
                        >
                          {homes.map((home, index) => (
                            <option key={index} value={home}>
                              {home}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <input
                          name="rentAmount"
                          value={editedExpense.rentAmount}
                          onChange={handleChange}
                          disabled={editedExpense.home === "own"}
                        />
                      </td>
                      <td>
                        <input
                          name="foodAmount"
                          value={editedExpense.foodAmount}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          name="entertainmentAmount"
                          value={editedExpense.entertainmentAmount}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          name="utilitiesAmount"
                          value={editedExpense.utilitiesAmount}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          name="personalAmount"
                          value={editedExpense.personalAmount}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          name="othersAmount"
                          value={editedExpense.othersAmount}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          name="monthlyAmount"
                          value={editedExpense.monthlyAmount}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <button onClick={() => handleSave(expense._id, user._id)}>
                          Save
                        </button>
                        <button onClick={handleCancel}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{expense.month}</td>
                      <td>{expense.home}</td>
                      <td>{expense.rentAmount}</td>
                      <td>{expense.foodAmount}</td>
                      <td>{expense.entertainmentAmount}</td>
                      <td>{expense.utilitiesAmount}</td>
                      <td>{expense.personalAmount}</td>
                      <td>{expense.othersAmount}</td>
                      <td>{expense.monthlyAmount}</td>
                      <td>
                        <button onClick={() => handleEdit(expenseIndex, expense)}>
                          Edit
                        </button>
                        <NavLink to={`/chart/${expense._id}`} state={expense}>
                          <button>Chart</button>
                        </NavLink>
                        <NavLink
                          to={`/suggestion/${expense._id}`}
                          state={{ expense }}
                        >
                          <button>Get Suggestion</button>
                        </NavLink>
                        <button
                          onClick={() => handleDelete(expense._id, user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseData;
