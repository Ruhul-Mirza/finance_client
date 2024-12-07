import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Wallet } from "lucide-react";
import { SuggestionList } from "./SuggestionList";
import { ExpenseSummaryCard } from "./ExpenseSummaryCard";

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

  const totalExpenses = rentAmount + entertainmentAmount + foodAmount + utilitiesAmount + personalAmount + otherAmount;
  const savings = salary - totalExpenses;

  const getSuggestions = () => {
    const suggestions = [];

    if (entertainmentAmount > salary * 0.2) {
      suggestions.push({
        icon: <Wallet className="w-5 h-5 text-rose-500" />,
        message: "You are spending too much on entertainment. Consider reducing your entertainment expenses.",
        type: "warning"
      });
    }

    if (foodAmount < salary * 0.1) {
      suggestions.push({
        icon: <Wallet className="w-5 h-5 text-amber-500" />,
        message: "You are spending too little on food. Consider increasing your food budget for better nutrition.",
        type: "warning"
      });
    }

    if (utilitiesAmount < salary * 0.05) {
      suggestions.push({
        icon: <Wallet className="w-5 h-5 text-amber-500" />,
        message: "You are spending too little on utilities. Ensure you're budgeting enough for essential services.",
        type: "warning"
      });
    }

    if (rentAmount === 0) {
      suggestions.push({
        icon: <Wallet className="w-5 h-5 text-green-500" />,
        message: "You own your house! Rent expenses are saved.",
        type: "success"
      });
    }

    if (totalExpenses > salary) {
      suggestions.push({
        icon: <Wallet className="w-5 h-5 text-rose-500" />,
        message: "Your total expenses exceed your monthly salary. Try to reduce spending in some areas to avoid overspending.",
        type: "danger"
      });
    }

    if (savings > 0) {
      suggestions.push({
        icon: <Wallet className="w-5 h-5 text-green-500" />,
        message: `You can save ₹${savings} this month! Try to save even more by reducing unnecessary expenses.`,
        type: "success"
      });
    } else {
      suggestions.push({
        icon: <Wallet className="w-5 h-5 text-amber-500" />,
        message: "Consider reducing your expenses to create savings this month.",
        type: "warning"
      });
    }

    if (savings < salary * 0.2) {
      suggestions.push({
        icon: <Wallet className="w-5 h-5 text-amber-500" />,
        message: "It's recommended to save at least 20% of your salary for future security. Try to increase your savings.",
        type: "warning"
      });
    }

    if (suggestions.length === 0) {
      suggestions.push({
        icon: <Wallet className="w-5 h-5 text-green-500" />,
        message: "Your expenses seem well balanced. Keep up the good work!",
        type: "success"
      });
    }

    return suggestions;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-2 rounded-xl shadow-lg shadow-violet-600/20">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Expense Suggestions</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ExpenseSummaryCard
              salary={salary}
              totalExpenses={totalExpenses}
              savings={savings}
            />
          </div>

          <div className="space-y-6">
            <SuggestionList suggestions={getSuggestions()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionPage;
