import React from 'react';
import { NavLink } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Edit2, Trash2, PieChart, Lightbulb, Plus, DollarSign, TrendingUp, Wallet } from 'lucide-react';
import { useExpenseData } from '../../hooks/useExpenseData';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const homes = ['own', 'rent'];

function ExpenseTable() {
  const {
    expenseData,
    editIndex,
    editedExpense,
    selectHome,
    handleEdit,
    handleChange,
    handleSave,
    handleDelete,
    handleCancel,
  } = useExpenseData();

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

  const monthlyAverage = totalExpenses / (expenseData.reduce((total, user) => total + user.expenses.length, 0) || 1);

  return (
    <div className="min-h-screen bg-gray-50">
    <div className="p-4 md:p-8 space-y-8 font-sans">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Smart Expense Tracker
        </h1>
        <p className="text-muted-foreground">Take control of your finances with smart insights and tracking</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Total Expenses</h3>
          </div>
          <p className="text-2xl font-bold text-blue-700 mt-2">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold text-purple-900">Monthly Average</h3>
          </div>
          <p className="text-2xl font-bold text-purple-700 mt-2">${monthlyAverage.toFixed(2)}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-green-900">Active Months</h3>
          </div>
          <p className="text-2xl font-bold text-green-700 mt-2">
            {expenseData.reduce((total, user) => total + user.expenses.length, 0)}
          </p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
          <div className="flex items-center gap-2">
            <PieChart className="h-5 w-5 text-orange-600" />
            <h3 className="font-semibold text-orange-900">Categories</h3>
          </div>
          <p className="text-2xl font-bold text-orange-700 mt-2">8 Active</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Expense History</h2>
        <NavLink to="/add-expense">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" /> Add Expense
          </Button>
        </NavLink>
      </div>

      <div className="rounded-lg border bg-card shadow-sm">
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-semibold">Month</TableHead>
                <TableHead className="font-semibold">Home</TableHead>
                <TableHead className="font-semibold">Rent</TableHead>
                <TableHead className="font-semibold">Food</TableHead>
                <TableHead className="font-semibold">Entertainment</TableHead>
                <TableHead className="font-semibold">Utilities</TableHead>
                <TableHead className="font-semibold">Personal</TableHead>
                <TableHead className="font-semibold">Others</TableHead>
                <TableHead className="font-semibold">Monthly Salary</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenseData.map((user) =>
                user.expenses.map((expense, expenseIndex) => (
                  <TableRow key={expense._id}>
                    {editIndex === expenseIndex ? (
                      <>
                        <TableCell>
                          <Select
                            name="month"
                            value={editedExpense.month}
                            onChange={handleChange}
                            disabled
                          >
                            {months.map((month) => (
                              <option key={month} value={month}>
                                {month}
                              </option>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select
                            name="home"
                            value={editedExpense.home}
                            onChange={handleChange}
                          >
                            {homes.map((home) => (
                              <option key={home} value={home}>
                                {home}
                              </option>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            name="rentAmount"
                            value={editedExpense.rentAmount}
                            onChange={handleChange}
                            disabled={editedExpense.home === 'own'}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            name="foodAmount"
                            value={editedExpense.foodAmount}
                            onChange={handleChange}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            name="entertainmentAmount"
                            value={editedExpense.entertainmentAmount}
                            onChange={handleChange}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            name="utilitiesAmount"
                            value={editedExpense.utilitiesAmount}
                            onChange={handleChange}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            name="personalAmount"
                            value={editedExpense.personalAmount}
                            onChange={handleChange}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            name="othersAmount"
                            value={editedExpense.othersAmount}
                            onChange={handleChange}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            name="monthlyAmount"
                            value={editedExpense.monthlyAmount}
                            onChange={handleChange}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSave(expense._id, user._id)}
                            >
                              Save
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleCancel}
                            >
                              Cancel
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{expense.month}</TableCell>
                        <TableCell>{expense.home}</TableCell>
                        <TableCell>${expense.rentAmount}</TableCell>
                        <TableCell>${expense.foodAmount}</TableCell>
                        <TableCell>${expense.entertainmentAmount}</TableCell>
                        <TableCell>${expense.utilitiesAmount}</TableCell>
                        <TableCell>${expense.personalAmount}</TableCell>
                        <TableCell>${expense.othersAmount}</TableCell>
                        <TableCell>${expense.monthlyAmount}</TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                              onClick={() => handleEdit(expenseIndex, expense)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-100"
                              onClick={() => handleDelete(expense._id, user._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <NavLink to={`/chart/${expense._id}`} state={expense}>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-purple-600 hover:text-purple-700 hover:bg-purple-100"
                              >
                                <PieChart className="h-4 w-4" />
                              </Button>
                            </NavLink>
                            <NavLink to={`/suggestion/${expense._id}`} state={{ expense }}>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-100"
                              >
                                <Lightbulb className="h-4 w-4" />
                              </Button>
                            </NavLink>
                          </div>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ExpenseTable;