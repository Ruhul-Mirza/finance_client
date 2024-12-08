import React, { useEffect, useState } from "react";
import {
  Save,
  XCircle,
  Edit2,
  Trash2,
  PieChart,
  Lightbulb,
  Plus,
} from "lucide-react";
import { ExpenseStats } from "./ExpenseStats";
import { NavLink } from "react-router-dom";

const ExpenseTable = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedExpense, setEditedExpense] = useState({});
  const [selectHome, setSelectHome] = useState("own");
  const token = localStorage.getItem("userdatatoken");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

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
    setEditedExpense({
      month: expense.month || "", // Default to an empty string if undefined
      home: expense.home || "",
      rentAmount: expense.rentAmount || "",
      foodAmount: expense.foodAmount || "",
      entertainmentAmount: expense.entertainmentAmount || "",
      utilitiesAmount: expense.utilitiesAmount || "",
      personalAmount: expense.personalAmount || "",
      othersAmount: expense.othersAmount || "",
      monthlyAmount: expense.monthlyAmount || "",
    });
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
    const total =
      parseFloat(editedExpense.home || 0) +
      parseFloat(editedExpense.rentAmount || 0) +
      parseFloat(editedExpense.foodAmount || 0) +
      parseFloat(editedExpense.entertainmentAmount || 0) +
      parseFloat(editedExpense.utilitiesAmount || 0) +
      parseFloat(editedExpense.personalAmount || 0) +
      parseFloat(editedExpense.othersAmount || 0);

    if (total > parseFloat(editedExpense.monthlyAmount || 0)) {
      alert("Your total expenses exceed your monthly salary.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:6999/expense/${expenseId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authenticate: `Bearer ${token}`,
          },
          body: JSON.stringify({
            expenses: editedExpense,
          }),
        }
      );
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto">

        <ExpenseStats expenseData={expenseData} />
        <div className="flex justify-end mt-6 md:mt-8">
  <NavLink
    to={"/expense"}
    className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600 drop-shadow-lg text-white rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:from-blue-700 hover:to-purple-800 hover:shadow-xl hover:shadow-blue-500/30 font-medium"
  >
    <Plus className="h-5 w-5 mr-3" />
    Add Expense
  </NavLink>
</div>


        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-lg bg-gray-50">
          <table className="w-full text-sm text-left table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-6 py-3 text-center text-base tracking-wide text-orange-900/90">
                  Month
                </th>
                <th className="px-6 py-3 text-center text-base tracking-wide text-[#065256]">
                  Home
                </th>
                <th className="px-6 py-3 text-center text-base tracking-wide text-pink-900/90">
                  Rent
                </th>
                <th className="px-6 py-3 text-center text-base tracking-wide text-green-900/90">
                  Food
                </th>
                <th className="px-6 py-3 text-center text-base tracking-wide text-yellow-900/90">
                  Entertainment
                </th>
                <th className="px-6 py-3 text-center text-base tracking-wide text-blue-900/90">
                  Utilities
                </th>
                <th className="px-6 py-3 text-center text-base tracking-wide text-purple-900/90">
                  Personal
                </th>
                <th className="px-6 py-3 text-center text-base tracking-wide text-red-900/90">
                  Others
                </th>
                <th className="px-6 py-3 text-center text-base tracking-wide text-emerald-900/90">
                  Salary
                </th>
                <th className="px-6 py-3 text-center text-base tracking-wide text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {expenseData.map((user, userIndex) =>
                user.expenses.map((expense, expenseIndex) => (
                  <tr
                    key={expense._id}
                    className="hover:bg-gray-100 transition-all duration-300 ease-in-out"
                  >
                    {editIndex === expenseIndex ? (
                      <>
                        {/* Editable rows */}
                        <td className="px-6 py-4">
                          <select
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#065256]"
                            name="month"
                            value={editedExpense.month || ""}
                            onChange={handleChange}
                            disabled
                          >
                            {months.map((month, index) => (
                              <option key={index} value={month}>
                                {capitalizeFirstLetter(month)}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#065256]"
                            name="home"
                            value={editedExpense.home}
                            onChange={handleChange}
                          >
                            {homes.map((home, index) => (
                              <option key={index} value={home}>
                                {capitalizeFirstLetter(home)}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className="px-6 py-4">
                          <input
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#065256]"
                            name="rentAmount"
                            value={editedExpense.rentAmount}
                            onChange={handleChange}
                            disabled={editedExpense.home === "own"}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#065256]"
                            name="foodAmount"
                            value={editedExpense.foodAmount || ""}
                            onChange={handleChange}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#065256]"
                            name="entertainmentAmount"
                            value={editedExpense.entertainmentAmount || ""}
                            onChange={handleChange}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#065256]"
                            name="utilitiesAmount"
                            value={editedExpense.utilitiesAmount || ""}
                            onChange={handleChange}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#065256]"
                            name="personalAmount"
                            value={editedExpense.personalAmount || ""}
                            onChange={handleChange}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#065256]"
                            name="othersAmount"
                            value={editedExpense.othersAmount || ""}
                            onChange={handleChange}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#065256]"
                            name="monthlyAmount"
                            value={editedExpense.monthlyAmount || ""}
                            onChange={handleChange}
                          />
                        </td>

                        {/* Save/Cancel Buttons */}
                        <td className="px-6 py-4 text-center" colSpan={10}>
                          <div className="flex justify-center gap-4">
                            <button
                              onClick={() => handleSave(expense._id, user._id)}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center space-x-2 shadow-md hover:bg-green-700 transition"
                            >
                              <Save className="w-4 h-4" />
                              <span>Save</span>
                            </button>
                            <button
                              onClick={handleCancel}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center space-x-2 shadow-md hover:bg-red-700 transition"
                            >
                              <XCircle className="w-4 h-4" />
                              <span>Cancel</span>
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        {/* Static rows */}
                        <td className="px-6 py-4 text-center font-semibold text-base text-orange-900/90">
                          {capitalizeFirstLetter(expense.month)}
                        </td>
                        <td className="px-6 py-4 text-center font-semibold text-base text-[#065256]">
                          {capitalizeFirstLetter(expense.home)}
                        </td>
                        <td className="px-6 py-4 text-center font-semibold text-base text-pink-700">
                          ₹{expense.rentAmount}
                        </td>
                        <td className="px-6 py-4 text-center font-semibold text-base text-green-700">
                          ₹{expense.foodAmount}
                        </td>
                        <td className="px-6 py-4 text-center font-semibold text-base text-yellow-700">
                          ₹{expense.entertainmentAmount}
                        </td>
                        <td className="px-6 py-4 text-center font-semibold text-base text-blue-700">
                          ₹{expense.utilitiesAmount}
                        </td>
                        <td className="px-6 py-4 text-center font-semibold text-base text-purple-700">
                          ₹{expense.personalAmount}
                        </td>
                        <td className="px-6 py-4 text-center font-semibold text-base text-red-700">
                          ₹{expense.othersAmount}
                        </td>
                        <td className="px-6 py-4 text-center font-semibold text-base text-emerald-700">
                          ₹{expense.monthlyAmount}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              onClick={() => handleEdit(expenseIndex, expense)}
                            >
                              <Edit2 className="h-5 w-5" />
                            </button>
                            <button
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              onClick={() =>
                                handleDelete(expense._id, user._id)
                              }
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                            <NavLink
                              to={`/chart/${expense._id}`}
                              state={expense}
                              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition"
                            >
                              <PieChart className="h-5 w-5" />
                            </NavLink>
                            <NavLink
                              to={`/suggestion/${expense._id}`}
                              state={{ expense }}
                              className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
                            >
                              <Lightbulb className="h-5 w-5" />
                            </NavLink>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTable;
