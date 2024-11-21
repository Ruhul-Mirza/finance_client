import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const SuggestionPage = () => {
  const location = useLocation();
  const expense = location.state?.expense;

  // Use state to track each category of expenses
  const [salary, setSalary] = useState(expense.monthlyAmount || 0);
  const [rentAmount, setRentAmount] = useState(expense.rentAmount || 0);
  const [entertainmentAmount, setEntertainmentAmount] = useState(expense.entertainmentAmount || 0);
  const [foodAmount, setFoodAmount] = useState(expense.foodAmount || 0);
  const [utilitiesAmount, setUtilitiesAmount] = useState(expense.utilitiesAmount || 0);
  const [personalAmount, setPersonalAmount] = useState(expense.personalAmount || 0);
  const [otherAmount, setOtherAmount] = useState(expense.othersAmount || 0);

  // Handle dynamic changes to expenses
  const handleExpenseChange = (field, value) => {
    switch (field) {
      case "salary":
        setSalary(value);
        break;
      case "rentAmount":
        setRentAmount(value);
        break;
      case "entertainmentAmount":
        setEntertainmentAmount(value);
        break;
      case "foodAmount":
        setFoodAmount(value);
        break;
      case "utilitiesAmount":
        setUtilitiesAmount(value);
        break;
      case "personalAmount":
        setPersonalAmount(value);
        break;
      case "otherAmount":
        setOtherAmount(value);
        break;
      default:
        break;
    }
  };

  // Total Expenses Calculation
  const totalExpenses = rentAmount + entertainmentAmount + foodAmount + utilitiesAmount + personalAmount + otherAmount;
  
  // Calculate Savings (remaining salary after expenses)
  const savings = salary - totalExpenses;

  // Suggestions based on expenses and salary
  const getSuggestions = () => {
    let suggestion = "";

    // Entertainment is too high (max 20% of salary)
    if (entertainmentAmount > salary * 0.2) {
      suggestion += "You are spending too much on entertainment. Consider reducing your entertainment expenses. ";
    }

    // Food is too low (at least 10% of salary)
    if (foodAmount < salary * 0.1) {
      suggestion += "You are spending too little on food. Consider increasing your food budget for better nutrition. ";
    }

    // Utilities too low (at least 5% of salary)
    if (utilitiesAmount < salary * 0.05) {
      suggestion += "You are spending too little on utilities. Ensure you're budgeting enough for essential services. ";
    }

    // Rent suggestions if owning a house (set rentAmount to 0 if own house)
    if (rentAmount === 0) {
      suggestion += "You own your house! Rent expenses are saved. ";
    }

    // Check if total expenses exceed salary
    if (totalExpenses > salary) {
      suggestion += "Your total expenses exceed your monthly salary. Try to reduce spending in some areas to avoid overspending.";
    }

    // Saving suggestion
    if (savings > 0) {
      suggestion += `You can save ₹${savings} this month! Try to save even more by reducing unnecessary expenses. `;
    } else {
      suggestion += "Consider reducing your expenses to create savings this month. ";
    }

    // Provide suggestion to save more
    if (savings < salary * 0.2) {
      suggestion += "It's recommended to save at least 20% of your salary for future security. Try to increase your savings. ";
    }

    // If no suggestions, everything seems balanced
    if (!suggestion) {
      suggestion = "Your expenses seem well balanced. Keep up the good work!";
    }

    return suggestion;
  };

  return (
    <div>
      <h2>Expense Suggestion</h2>
      <div>
        <label>Monthly Salary:</label>
        <input
          type="number"
          value={salary}
          onChange={(e) => handleExpenseChange("salary", e.target.value)}
        />
      </div>
      <div>
        <label>Rent Amount (0 if owned house):</label>
        <input
          type="number"
          value={rentAmount}
          onChange={(e) => handleExpenseChange("rentAmount", e.target.value)}
        />
      </div>
      <div>
        <label>Entertainment Expenses:</label>
        <input
          type="number"
          value={entertainmentAmount}
          onChange={(e) => handleExpenseChange("entertainmentAmount", e.target.value)}
        />
      </div>
      <div>
        <label>Food Expenses:</label>
        <input
          type="number"
          value={foodAmount}
          onChange={(e) => handleExpenseChange("foodAmount", e.target.value)}
        />
      </div>
      <div>
        <label>Utilities Expenses:</label>
        <input
          type="number"
          value={utilitiesAmount}
          onChange={(e) => handleExpenseChange("utilitiesAmount", e.target.value)}
        />
      </div>
      <div>
        <label>Personal Expenses:</label>
        <input
          type="number"
          value={personalAmount}
          onChange={(e) => handleExpenseChange("personalAmount", e.target.value)}
        />
      </div>
      <div>
        <label>Other Expenses:</label>
        <input
          type="number"
          value={otherAmount}
          onChange={(e) => handleExpenseChange("otherAmount", e.target.value)}
        />
      </div>

      <p>{getSuggestions()}</p>
    </div>
  );
};

export default SuggestionPage;
