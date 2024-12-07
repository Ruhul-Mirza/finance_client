import React from "react";
import { Wallet, PiggyBank, TrendingDown } from "lucide-react";

export const ExpenseSummaryCard = ({ salary, totalExpenses, savings }) => {
  const savingsPercentage = ((savings / salary) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Summary</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-violet-50 rounded-xl">
          <div className="flex items-center gap-3">
            <Wallet className="w-5 h-5 text-violet-600" />
            <span className="font-medium text-violet-900">Monthly Salary</span>
          </div>
          <span className="font-semibold text-violet-900">₹{salary.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-rose-50 rounded-xl">
          <div className="flex items-center gap-3">
            <TrendingDown className="w-5 h-5 text-rose-600" />
            <span className="font-medium text-rose-900">Total Expenses</span>
          </div>
          <span className="font-semibold text-rose-900">₹{totalExpenses.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
          <div className="flex items-center gap-3">
            <PiggyBank className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-900">Savings</span>
          </div>
          <div className="text-right">
            <span className="font-semibold text-green-900">₹{savings.toLocaleString()}</span>
            <div className="text-sm text-green-600">{savingsPercentage}% of income</div>
          </div>
        </div>
      </div>
    </div>
  );
};
