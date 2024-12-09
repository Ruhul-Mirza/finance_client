import React from 'react';
import { Wallet, TrendingUp, Coins, PiggyBank } from 'lucide-react';

export function ExpenseStats({ expenseData }) {
  const totalExpenses = expenseData.reduce((total, user) => {
    return total + user.expenses.reduce((userTotal, expense) => {
      return (
        userTotal +
        parseFloat(expense.rentAmount || '0') +
        parseFloat(expense.foodAmount || '0') +
        parseFloat(expense.entertainmentAmount || '0') +
        parseFloat(expense.utilitiesAmount || '0') +
        parseFloat(expense.personalAmount || '0') +
        parseFloat(expense.othersAmount || '0')
      );
    }, 0);
  }, 0);

  const totalSavings = expenseData.reduce((total, user) => {
    return total + user.expenses.reduce((userTotal, expense) => {
      const monthlyIncome = parseFloat(expense.monthlyAmount || '0');
      const totalUserExpenses =
        parseFloat(expense.rentAmount || '0') +
        parseFloat(expense.foodAmount || '0') +
        parseFloat(expense.entertainmentAmount || '0') +
        parseFloat(expense.utilitiesAmount || '0') +
        parseFloat(expense.personalAmount || '0') +
        parseFloat(expense.othersAmount || '0');
      return userTotal + (monthlyIncome - totalUserExpenses);
    }, 0);
  }, 0);

  const monthlyAverage = totalExpenses / (expenseData.reduce((total, user) => total + user.expenses.length, 0) || 1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Expenses */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-lg">
        <div className="flex items-center gap-4">
          <Coins className="h-8 w-8 text-blue-600" />
          <h3 className="font-semibold text-blue-900 text-xl">Total Expenses</h3>
        </div>
        <p className="text-3xl font-bold text-blue-700 mt-3">₹{totalExpenses.toFixed(2)}</p>
      </div>
  
      {/* Monthly Average */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 shadow-lg">
        <div className="flex items-center gap-4">
          <Wallet className="h-8 w-8 text-purple-600" />
          <h3 className="font-semibold text-purple-900 text-xl">Monthly Average</h3>
        </div>
        <p className="text-3xl font-bold text-purple-700 mt-3">₹{monthlyAverage.toFixed(2)}</p>
      </div>
  
      {/* Active Months */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 shadow-lg">
        <div className="flex items-center gap-4">
          <TrendingUp className="h-8 w-8 text-green-600" />
          <h3 className="font-semibold text-green-900 text-xl">Recorded Months</h3>
        </div>
        <p className="text-3xl font-bold text-green-700 mt-3">
          {expenseData.reduce((total, user) => total + user.expenses.length, 0)}
        </p>
      </div>
  
      {/* Total Savings */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200 shadow-lg">
        <div className="flex items-center gap-4">
          <PiggyBank className="h-8 w-8 text-orange-600" />
          <h3 className="font-semibold text-orange-900 text-xl">Total Savings</h3>
        </div>
        <p className="text-3xl font-bold text-orange-700 mt-3">₹{totalSavings.toFixed(2)}</p>
      </div>
    </div>
  );
}
