import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import ExpenseData from "./ExpenseData";

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
    z.coerce.number().nonnegative().refine((val) => val >= 0, {
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
    <>
      <form>
        <label htmlFor="month">Select Month</label>
        <select
          name="months"
          id="months"
          value={selectedMonth}
          onChange={setVal}
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
        {/* home */}
        <label htmlFor="home">Home:</label>
        <input
          type="radio"
          name="home"
          id="HomeOwn"
          value="own"
          checked={selectRadio === "own"}
          onChange={setVal}
        />
        Own
        <input
          type="radio"
          name="home"
          id="HomeRent"
          value="rent"
          checked={selectRadio === "rent"}
          onChange={setVal}
        />
        Rent
        <input
          id="rentAmount"
          type="text"
          name="rentAmount"
          placeholder={selectRadio === "rent" ? "Enter Your Rent" : 0}
          disabled={selectRadio === "own"}
          value={inputVal.rentAmount}
          onChange={setVal}
          style={{ border: errors.rentAmount ? "1px solid red" : "" }}
        />
        {errors.rentAmount && (
          <p style={{ color: "red" }}>{errors.rentAmount}</p>
        )}
        {/* Food Amount Input */}
        <label htmlFor="foodAmount">Food:</label>
        <input
          id="foodAmount"
          type="text"
          name="foodAmount"
          value={inputVal.foodAmount}
          onChange={setVal}
          placeholder="Enter Your Food Cost"
          style={{ border: errors.foodAmount ? "1px solid red" : "" }}
        />
        {errors.foodAmount && (
          <p style={{ color: "red" }}>{errors.foodAmount}</p>
        )}
        {/* Entertainment Amount Input */}
        <label htmlFor="entertainmentAmount">Entertainment:</label>
        <input
          id="entertainmentAmount"
          type="text"
          name="entertainmentAmount"
          value={inputVal.entertainmentAmount}
          onChange={setVal}
          placeholder="Enter Your Entertainment Cost"
          style={{ border: errors.entertainmentAmount ? "1px solid red" : "" }}
        />
        {errors.entertainmentAmount && (
          <p style={{ color: "red" }}>{errors.entertainmentAmount}</p>
        )}
        {/* Utilities Amount Input */}
        <label htmlFor="utilitiesAmount">Utilities:</label>
        <input
          id="utilitiesAmount"
          type="text"
          name="utilitiesAmount"
          value={inputVal.utilitiesAmount}
          onChange={setVal}
          placeholder="Enter Your Utilities Cost"
          style={{ border: errors.utilitiesAmount ? "1px solid red" : "" }}
        />
        {errors.utilitiesAmount && (
          <p style={{ color: "red" }}>{errors.utilitiesAmount}</p>
        )}
        {/* Personal Amount Input */}
        <label htmlFor="personalAmount">Personal:</label>
        <input
          id="personalAmount"
          type="text"
          name="personalAmount"
          value={inputVal.personalAmount}
          onChange={setVal}
          placeholder="Enter Your Personal Cost"
          style={{ border: errors.personalAmount ? "1px solid red" : "" }}
        />
        {errors.personalAmount && (
          <p style={{ color: "red" }}>{errors.personalAmount}</p>
        )}
        {/* Others Amount Input */}
        <label htmlFor="othersAmount">Others:</label>
        <input
          id="othersAmount"
          type="text"
          name="othersAmount"
          value={inputVal.othersAmount}
          onChange={setVal}
          placeholder="Enter Your Others Cost"
          style={{ border: errors.othersAmount ? "1px solid red" : "" }}
        />
        {errors.othersAmount && (
          <p style={{ color: "red" }}>{errors.othersAmount}</p>
        )}
        {/* Monthly Salary Input */}
        <label htmlFor="monthlyAmount">Monthly Salary:</label>
        <input
          id="monthlyAmount"
          type="text"
          name="monthlyAmount"
          value={inputVal.monthlyAmount}
          onChange={setVal}
          placeholder="Enter Your Monthly Salary"
          style={{ border: errors.monthlyAmount ? "1px solid red" : "" }}
        />
        {errors.monthlyAmount && (
          <p style={{ color: "red" }}>{errors.monthlyAmount}</p>
        )}
        <button type="button" onClick={addExpense}>
          Submit
        </button>
        <button type="button">Cancel</button>
      </form>
      <button onClick={toggleTable}>
        {showTable ? "Hide Table" : "Show Table"}
      </button>
      {showTable && <ExpenseData />}
    </>
  );
};

export default Expense;
