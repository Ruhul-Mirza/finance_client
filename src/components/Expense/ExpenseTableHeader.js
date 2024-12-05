import React from 'react';
import { Wallet, TrendingUp, DollarSign } from 'lucide-react';

export function ExpenseTableHeader() {
  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 rotate-3 transform hover:rotate-6 transition-all duration-300 shadow-lg hover:shadow-xl">
          <Wallet className="w-10 h-10 text-blue-600" />
        </div>
        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 -rotate-3 transform hover:-rotate-6 transition-all duration-300 shadow-lg hover:shadow-xl">
          <TrendingUp className="w-10 h-10 text-purple-600" />
        </div>
        <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 rotate-3 transform hover:rotate-6 transition-all duration-300 shadow-lg hover:shadow-xl">
          <DollarSign className="w-10 h-10 text-pink-600" />
        </div>
      </div>
      <div className="space-y-2">
        <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-outfit">
          Expense Tracker
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl text-center font-light">
          Track, analyze, and optimize your monthly expenses with our intelligent expense management system
        </p>
      </div>
    </div>
  );
}
