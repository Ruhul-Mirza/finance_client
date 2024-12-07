// Define expense interface
export const Expense = {
    _id: '',
    month: '',
    home: '',
    rentAmount: '',
    foodAmount: '',
    entertainmentAmount: '',
    utilitiesAmount: '',
    personalAmount: '',
    othersAmount: '',
    monthlyAmount: '',
  };
  
  // Define user interface
  export const User = {
    _id: '',
    expenses: [],
  };
  
  // Define expense table properties interface
  export const ExpenseTableProps = {
    expenseData: [],
    editIndex: null,
    editedExpense: null,
    handleEdit: (index, expense) => {},
    handleChange: (e) => {},
    handleSave: (expenseId, userId) => {},
    handleDelete: (expenseId, userId) => {},
    handleCancel: () => {},
  };
  