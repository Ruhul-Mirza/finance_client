import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const SuggestionPage = () => {
  const location = useLocation();
  const expense = location.state?.expense;

  const [salary, setSalary] = useState(expense?.monthlyAmount || 0);
  const [rentAmount, setRentAmount] = useState(expense?.rentAmount || 0);
  const [entertainmentAmount, setEntertainmentAmount] = useState(expense?.entertainmentAmount || 0);
  const [foodAmount, setFoodAmount] = useState(expense?.foodAmount || 0);
  const [utilitiesAmount, setUtilitiesAmount] = useState(expense?.utilitiesAmount || 0);
  const [personalAmount, setPersonalAmount] = useState(expense?.personalAmount || 0);
  const [otherAmount, setOtherAmount] = useState(expense?.othersAmount || 0);

  const handleExpenseChange = (field, value) => {
    const numericValue = parseFloat(value) || 0;
    switch (field) {
      case "salary":
        setSalary(numericValue);
        break;
      case "rentAmount":
        setRentAmount(numericValue);
        break;
      case "entertainmentAmount":
        setEntertainmentAmount(numericValue);
        break;
      case "foodAmount":
        setFoodAmount(numericValue);
        break;
      case "utilitiesAmount":
        setUtilitiesAmount(numericValue);
        break;
      case "personalAmount":
        setPersonalAmount(numericValue);
        break;
      case "otherAmount":
        setOtherAmount(numericValue);
        break;
      default:
        break;
    }
  };

  const totalExpenses = rentAmount + entertainmentAmount + foodAmount + utilitiesAmount + personalAmount + otherAmount;
  const savings = salary - totalExpenses;

  const getSuggestions = () => {
    const suggestions = [];

    if (entertainmentAmount > salary * 0.2) {
      suggestions.push("You are spending too much on entertainment. Consider reducing your entertainment expenses.");
    }

    if (foodAmount < salary * 0.1) {
      suggestions.push("You are spending too little on food. Consider increasing your food budget for better nutrition.");
    }

    if (utilitiesAmount < salary * 0.05) {
      suggestions.push("You are spending too little on utilities. Ensure you're budgeting enough for essential services.");
    }

    if (rentAmount === 0) {
      suggestions.push("You own your house! Rent expenses are saved.");
    }

    if (totalExpenses > salary) {
      suggestions.push("Your total expenses exceed your monthly salary. Try to reduce spending in some areas to avoid overspending.");
    }

    if (savings > 0) {
      suggestions.push(`You can save ₹${savings} this month! Try to save even more by reducing unnecessary expenses.`);
    } else {
      suggestions.push("Consider reducing your expenses to create savings this month.");
    }

    if (savings < salary * 0.2) {
      suggestions.push("It's recommended to save at least 20% of your salary for future security. Try to increase your savings.");
    }

    if (suggestions.length === 0) {
      suggestions.push("Your expenses seem well balanced. Keep up the good work!");
    }

    return suggestions;
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
        <label>Rent Amount:</label>
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

      <h3>Suggestions</h3>
      <ul>
        {getSuggestions().map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionPage;
