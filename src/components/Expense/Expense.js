import React, { useState } from 'react';
import { Home, DollarSign, Coffee, Film, Lightbulb, User, Package, Wallet, ChevronDown, ChevronUp, PiggyBank } from 'lucide-react';
import { expenseSchema } from './expenseValidation';
import ExpenseInput from './ExpenseInput';
import MonthSelect from './MonthSelect';
import { NavLink } from 'react-router-dom';

const ExpenseForm = () => {
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
        rentAmount: value === "own" ? "" : prev.rentAmount,
      }));
    } else if (name === "months") {
      setSelectedMonth(value);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-lg backdrop-filter">
          <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-10 md:px-12">
            <div className="relative z-10">
              <div className="flex items-center justify-center space-x-3">
                <PiggyBank className="h-10 w-10 text-white" />
                <h2 className="text-3xl font-extrabold text-white">Expense Tracker</h2>
              </div>
              <p className="mt-2 text-center text-indigo-100">Track your monthly expenses and savings with ease</p>
            </div>
            <div className="absolute inset-0 bg-black opacity-10"></div>
          </div>

          <div className="px-6 py-8 md:px-12">
            <form className="space-y-8" onSubmit={addExpense}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-3">
                  <MonthSelect value={selectedMonth} onChange={setVal} />
                </div>

                <div className="md:col-span-3">
                  <div className="bg-gray-50 rounded-xl p-6 space-y-4 transform transition-all duration-200 hover:shadow-md">
                    <label className="block text-sm font-medium text-gray-700">Home Status</label>
                    <div className="flex space-x-6">
                      <label className="relative flex items-center group">
                        <input
                          type="radio"
                          name="home"
                          value="own"
                          checked={selectRadio === "own"}
                          onChange={setVal}
                          className="form-radio h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                        />
                        <span className="ml-2 text-gray-700 group-hover:text-indigo-600 transition-colors">Own</span>
                      </label>
                      <label className="relative flex items-center group">
                        <input
                          type="radio"
                          name="home"
                          value="rent"
                          checked={selectRadio === "rent"}
                          onChange={setVal}
                          className="form-radio h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                        />
                        <span className="ml-2 text-gray-700 group-hover:text-indigo-600 transition-colors">Rent</span>
                      </label>
                    </div>

                    {selectRadio === "rent" && (
                      <div className="mt-4 animate-fadeIn">
                        <ExpenseInput
                          icon={<Home className="h-5 w-5 text-indigo-400" />}
                          name="rentAmount"
                          label="Rent Amount"
                          value={inputVal.rentAmount}
                          onChange={setVal}
                          error={errors.rentAmount}
                          placeholder="Enter rent amount"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <ExpenseInput
                  icon={<Coffee className="h-5 w-5 text-indigo-400" />}
                  name="foodAmount"
                  label="Food"
                  value={inputVal.foodAmount}
                  onChange={setVal}
                  error={errors.foodAmount}
                  placeholder="Enter food expenses"
                />

                <ExpenseInput
                  icon={<Film className="h-5 w-5 text-indigo-400" />}
                  name="entertainmentAmount"
                  label="Entertainment"
                  value={inputVal.entertainmentAmount}
                  onChange={setVal}
                  error={errors.entertainmentAmount}
                  placeholder="Enter entertainment expenses"
                />

                <ExpenseInput
                  icon={<Lightbulb className="h-5 w-5 text-indigo-400" />}
                  name="utilitiesAmount"
                  label="Utilities"
                  value={inputVal.utilitiesAmount}
                  onChange={setVal}
                  error={errors.utilitiesAmount}
                  placeholder="Enter utilities expenses"
                />

                <ExpenseInput
                  icon={<User className="h-5 w-5 text-indigo-400" />}
                  name="personalAmount"
                  label="Personal"
                  value={inputVal.personalAmount}
                  onChange={setVal}
                  error={errors.personalAmount}
                  placeholder="Enter personal expenses"
                />

                <ExpenseInput
                  icon={<Package className="h-5 w-5 text-indigo-400" />}
                  name="othersAmount"
                  label="Others"
                  value={inputVal.othersAmount}
                  onChange={setVal}
                  error={errors.othersAmount}
                  placeholder="Enter other expenses"
                />

                <ExpenseInput
                  icon={<Wallet className="h-5 w-5 text-indigo-400" />}
                  name="monthlyAmount"
                  label="Monthly Salary"
                  value={inputVal.monthlyAmount}
                  onChange={setVal}
                  error={errors.monthlyAmount}
                  placeholder="Enter monthly salary"
                />
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Save Expenses
                </button>
                <NavLink to={"/expenseTable"}>
                {/* <button
                  type="button"
                  className="flex-1 border border-indigo-600 text-indigo-600 px-6 py-3 rounded-full hover:bg-indigo-600 hover:text-white"
                >
                  View Expenses
                </button> */}
                CLick me
                </NavLink>
                {/* <button
                  type="button"
                  onClick={() => setShowTable(!showTable)}
                  className="flex-1 border border-indigo-600 text-indigo-600 px-6 py-3 rounded-full hover:bg-indigo-600 hover:text-white"
                >
                  View Expenses
                </button> */}
              </div>
            </form>

            {/* {showTable && <ExpenseData />} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;
