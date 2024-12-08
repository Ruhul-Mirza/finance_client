import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { z } from "zod";
import {
  Home,
  DollarSign,
  Coffee,
  Film,
  Lightbulb,
  User,
  Package,
  Wallet,
  ChevronDown,
  ChevronUp,
  PiggyBank,
} from "lucide-react";
import ExpenseTable from "./ExpenseTable";

// Validation schema remains unchanged
const expenseSchema = z.object({
  home: z.enum(["own", "rent"]),
  rentAmount: z.preprocess(
    (value, ctx) => {
      // If home is 'own', coerce rentAmount to 0
      if (ctx?.parent?.home === "own") {
        return 0;
      }
      return value;
    },
    z.coerce
      .number()
      .nonnegative()
      .refine((val) => val >= 0, {
        message: "Rent amount must be a valid non-negative number.",
      })
  ),
  foodAmount: z
    .string()
    .trim()
    .min(1)
    .regex(/^[0-9]+(\.[0-9]+)?$/, {
      message: "Food amount is required and must be a valid number.",
    }),
  entertainmentAmount: z
    .string()
    .trim()
    .min(1)
    .regex(/^[0-9]+(\.[0-9]+)?$/, {
      message: "Entertainment cost is required and must be a valid number.",
    }),
  utilitiesAmount: z
    .string()
    .trim()
    .min(1)
    .regex(/^[0-9]+(\.[0-9]+)?$/, {
      message: "Utilities cost is required and must be a valid number.",
    }),
  personalAmount: z
    .string()
    .trim()
    .min(1)
    .regex(/^[0-9]+(\.[0-9]+)?$/, {
      message: "Personal cost is required and must be a valid number.",
    }),
  othersAmount: z
    .string()
    .trim()
    .min(1)
    .regex(/^[0-9]+(\.[0-9]+)?$/, {
      message: "Others cost is required and must be a valid number.",
    }),
  monthlyAmount: z
    .string()
    .trim()
    .min(1)
    .regex(/^[0-9]+(\.[0-9]+)?$/, {
      message: "Monthly Salary is required and must be a valid number.",
    }),
});

const Expense = () => {
  const [inputVal, setInputValue] = useState({
    home: "own",
    rentAmount: "",
    foodAmount: "",
    entertainmentAmount: "",
    utilitiesAmount: "",
    personalAmount: "",
    othersAmount: "",
    monthlyAmount: "",
  });
  const [selectRadio, setSelectRadio] = useState("own");
  const [errors, setErrors] = useState({});
  const [selectedMonth, setSelectedMonth] = useState("january");
  const [showTable, setShowTable] = useState(false);
  const setVal = (e) => {
    const { name, value } = e.target;
    if (name === "home") {
      setSelectRadio(value);
      setInputValue((prev) => ({
        ...prev,
        home: value,
        rentAmount: value === "own" ? "" : prev.rentAmount, // Set rentAmount to "" when "own"
      }));
    } else if (name === "months") {
      setSelectedMonth(value); // Update selected month
    } else {
      setInputValue((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateInputs = () => {
    try {
      expenseSchema.parse(inputVal);
      setErrors({});
      return true;
    } catch (error) {
      const fieldErrors = {};
      error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
  };

  const addExpense = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    const {
      home,
      rentAmount,
      foodAmount,
      entertainmentAmount,
      utilitiesAmount,
      personalAmount,
      othersAmount,
      monthlyAmount,
    } = inputVal;

    const total =
      (home === "rent" ? parseFloat(rentAmount) || 0 : 0) +
      (parseFloat(foodAmount) || 0) +
      (parseFloat(entertainmentAmount) || 0) +
      (parseFloat(utilitiesAmount) || 0) +
      (parseFloat(personalAmount) || 0) +
      (parseFloat(othersAmount) || 0);

    if (total > (parseFloat(monthlyAmount) || 0)) {
      alert("Your total expenses exceed your monthly salary.");
      return;
    }
    const savingAmount = parseFloat(monthlyAmount) - total;

    const token = localStorage.getItem("userdatatoken");
    try {
      const response = await fetch("http://localhost:6999/expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authenticate: `Bearer ${token}`,
        },
        body: JSON.stringify({
          home,
          month: selectedMonth,
          rentAmount: home === "rent" ? rentAmount : null,
          foodAmount,
          entertainmentAmount,
          utilitiesAmount,
          personalAmount,
          othersAmount,
          monthlyAmount,
          savingAmount,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Your data for ${selectedMonth} is already registered. To make changes, please edit it.`
        );
      }

      setInputValue({
        home: "own",
        rentAmount: "",
        foodAmount: "",
        entertainmentAmount: "",
        utilitiesAmount: "",
        personalAmount: "",
        othersAmount: "",
        monthlyAmount: "",
      });
      setSelectRadio("own");
    } catch (error) {
      alert(error.message);
    }
  };

  const toggleTable = () => {
    setShowTable((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-lg backdrop-filter">
          <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-10 md:px-12">
            <div className="relative z-10">
              <div className="flex items-center justify-center space-x-3">
                <PiggyBank className="h-10 w-10 text-white" />
                <h2 className="text-3xl font-extrabold text-white">
                  Expense Tracker
                </h2>
              </div>
              <p className="mt-2 text-center text-indigo-100">
                Track your monthly expenses and savings with ease
              </p>
            </div>
            <div className="absolute inset-0 bg-black opacity-10"></div>
          </div>

          <div className="px-6 py-8 md:px-12">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-3">
                  {/* months */}
                  <label
                    htmlFor="month"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Select Month
                  </label>
                  <select
                    name="months"
                    id="months"
                    value={selectedMonth}
                    onChange={setVal}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>

                {/* rent Amount */}
                <div className="md:col-span-3">
                  <div className="bg-gray-50 rounded-xl p-6 space-y-4 transform transition-all duration-200 hover:shadow-md">
                    <label className="block text-sm font-medium text-gray-700">
                      Home Status
                    </label>
                    <div className="flex space-x-6">
                      <label className="relative flex items-center group">
                        <input
                          type="radio"
                          name="home"
                          id="HomeOwn"
                          value="own"
                          checked={selectRadio === "own"}
                          onChange={setVal}
                          className="form-radio h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                        />
                        <span className="ml-2 text-gray-700 group-hover:text-indigo-600 transition-colors">
                          Own
                        </span>
                      </label>
                      <label className="relative flex items-center group">
                        <input
                          type="radio"
                          name="home"
                          id="HomeRent"
                          value="rent"
                          checked={selectRadio === "rent"}
                          onChange={setVal}
                          className="form-radio h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                        />
                        <span className="ml-2 text-gray-700 group-hover:text-indigo-600 transition-colors">
                          Rent
                        </span>
                      </label>
                    </div>

                    <div className="group">
                      <div className="mt-4 animate-fadeIn">
                        <div className="relative rounded-xl shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-hover:text-indigo-500">
                            {<Home />}
                          </div>
                          <input
                            id="rentAmount"
                            type="text"
                            name="rentAmount"
                            placeholder={
                              selectRadio === "rent" ? "Enter Your Rent" : 0
                            }
                            disabled={selectRadio === "own"}
                            value={inputVal.rentAmount}
                            onChange={setVal}
                            style={{
                              border: errors.rentAmount ? "1px solid red" : "",
                            }}
                            className="block w-full pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 border rounded-xl focus:ring-2 focus:ring-offset-0 transition-all duration-200"
                          />
                        </div>
                        {errors.rentAmount && (
                          <p style={{ color: "red" }}>{errors.rentAmount}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* food amount */}
                <div className="group">
                  <label
                    htmlFor="foodAmount"
                    className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-indigo-600 transition-colors"
                  >
                    Food:
                  </label>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-hover:text-indigo-500">
                      {<Coffee />}
                    </div>
                    <input
                      id="foodAmount"
                      type="text"
                      name="foodAmount"
                      value={inputVal.foodAmount}
                      onChange={setVal}
                      placeholder="Enter Your Food Cost"
                      className="block w-full pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 border rounded-xl focus:ring-2 focus:ring-offset-0 transition-all duration-200"
                      style={{
                        border: errors.foodAmount ? "1px solid red" : "",
                      }}
                    />
                  </div>
                  {errors.foodAmount && (
                    <p style={{ color: "red" }}>{errors.foodAmount}</p>
                  )}
                </div>

                {/* Entertainment Amount */}
                <div className="group">
                  <label
                    htmlFor="entertainmentAmount"
                    className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-indigo-600 transition-colors"
                  >
                    Entertainment:
                  </label>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-hover:text-indigo-500">
                      {<Film />}
                    </div>
                    <input
                      id="entertainmentAmount"
                      type="text"
                      name="entertainmentAmount"
                      value={inputVal.entertainmentAmount}
                      onChange={setVal}
                      placeholder="Enter Your Entertainment..."
                      className="block w-full pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 border rounded-xl focus:ring-2 focus:ring-offset-0 transition-all duration-200"
                      style={{
                        border: errors.entertainmentAmount
                          ? "1px solid red"
                          : "",
                      }}
                    />
                  </div>
                  {errors.entertainmentAmount && (
                    <p style={{ color: "red" }}>{errors.entertainmentAmount}</p>
                  )}
                </div>

                {/* utilities Amount */}
                <div className="group">
                  <label
                    htmlFor="utilitiesAmount"
                    className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-indigo-600 transition-colors"
                  >
                    Utilities:
                  </label>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-hover:text-indigo-500">
                      {<Lightbulb />}
                    </div>
                    <input
                      id="utilitiesAmount"
                      type="text"
                      name="utilitiesAmount"
                      value={inputVal.utilitiesAmount}
                      onChange={setVal}
                      placeholder="Enter Your Utilities Cost"
                      className="block w-full pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 border rounded-xl focus:ring-2 focus:ring-offset-0 transition-all duration-200"
                      style={{
                        border: errors.utilitiesAmount ? "1px solid red" : "",
                      }}
                    />
                  </div>
                  {errors.utilitiesAmount && (
                    <p style={{ color: "red" }}>{errors.utilitiesAmount}</p>
                  )}
                </div>

                {/* personal Amount */}
                <div className="group">
                  <label
                    htmlFor="personalAmount"
                    className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-indigo-600 transition-colors"
                  >
                    Personal:
                  </label>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-hover:text-indigo-500">
                      {<User />}
                    </div>
                    <input
                      id="personalAmount"
                      type="text"
                      name="personalAmount"
                      value={inputVal.personalAmount}
                      onChange={setVal}
                      placeholder="Enter Your Personal Cost"
                      className="block w-full pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 border rounded-xl focus:ring-2 focus:ring-offset-0 transition-all duration-200"
                      style={{
                        border: errors.personalAmount ? "1px solid red" : "",
                      }}
                    />
                  </div>
                  {errors.personalAmount && (
                    <p style={{ color: "red" }}>{errors.personalAmount}</p>
                  )}
                </div>

                {/* other Amount */}
                <div className="group">
                  <label
                    htmlFor="othersAmount"
                    className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-indigo-600 transition-colors"
                  >
                    Others:
                  </label>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-hover:text-indigo-500">
                      {<Package />}
                    </div>
                    <input
                      id="othersAmount"
                      type="text"
                      name="othersAmount"
                      value={inputVal.othersAmount}
                      onChange={setVal}
                      placeholder="Enter Your Others Cost"
                      className="block w-full pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 border rounded-xl focus:ring-2 focus:ring-offset-0 transition-all duration-200"
                      style={{
                        border: errors.othersAmount ? "1px solid red" : "",
                      }}
                    />
                  </div>
                  {errors.othersAmount && (
                    <p style={{ color: "red" }}>{errors.othersAmount}</p>
                  )}
                </div>

                {/* monthlyAmount */}
                <div className="group">
                  <label
                    htmlFor="monthlyAmount"
                    className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-indigo-600 transition-colors"
                  >
                    Salary:
                  </label>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-hover:text-indigo-500">
                      {<Wallet />}
                    </div>
                    <input
                      id="monthlyAmount"
                      type="text"
                      name="monthlyAmount"
                      value={inputVal.monthlyAmount}
                      onChange={setVal}
                      placeholder="Enter Your Salary"
                      className="block w-full pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 border rounded-xl focus:ring-2 focus:ring-offset-0 transition-all duration-200"
                      style={{
                        border: errors.monthlyAmount ? "1px solid red" : "",
                      }}
                    />
                  </div>
                  {errors.monthlyAmount && (
                    <p style={{ color: "red" }}>{errors.monthlyAmount}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <button
                  type="button"
                  onClick={addExpense}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Save Expenses
                </button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;
