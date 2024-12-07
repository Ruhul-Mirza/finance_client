<div className="overflow-x-auto">
<table className="w-full">
  <thead>
    <tr className="bg-gradient-to-r from-gray-900 to-gray-800">
      <th className="text-white px-4 py-2">Month</th>
      <th className="text-white px-4 py-2">Home</th>
      <th className="bg-pink-900/90 text-white px-4 py-2">Rent</th>
      <th className="bg-green-900/90 text-white px-4 py-2">Food</th>
      <th className="bg-yellow-900/90 text-white px-4 py-2">
        Entertainment
      </th>
      <th className="bg-blue-900/90 text-white px-4 py-2">
        Utilities
      </th>
      <th className="bg-purple-900/90 text-white px-4 py-2">
        Personal
      </th>
      <th className="bg-red-900/90 text-white px-4 py-2">Others</th>
      <th className="bg-emerald-900/90 text-white px-4 py-2">
        Salary
      </th>
      <th className="text-white px-4 py-2">Actions</th>
    </tr>
  </thead>
  <tbody className="bg-white">
    {expenseData.map((user, userIndex) =>
      user.expenses.map((expense, expenseIndex) => {
        return (
          <tr key={expense._id} className="border-b border-gray">
            {editIndex === expenseIndex ? (
              <>
                <td className="px-4 py-2">
                  <select
                    className="w-full p-2 border rounded"
                    name="month"
                    value={editedExpense.month || ""}
                    onChange={handleChange}
                    disabled
                  >
                    {months.map((month, index) => (
                      <option key={index} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2">
                  <select
                    className="w-full p-2 border rounded"
                    name="home"
                    value={editedExpense.home}
                    onChange={handleChange}
                  >
                    {homes.map((home, index) => (
                      <option key={index} value={home}>
                        {home}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2">
                  <input
                    className="w-full p-2 border rounded"
                    name="rentAmount"
                    value={editedExpense.rentAmount}
                    onChange={handleChange}
                    disabled={editedExpense.home === "own"}
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    className="w-full p-2 border rounded"
                    name="foodAmount"
                    value={editedExpense.foodAmount}
                    onChange={handleChange}
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    className="w-full p-2 border rounded"
                    name="entertainmentAmount"
                    value={editedExpense.entertainmentAmount}
                    onChange={handleChange}
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    className="w-full p-2 border rounded"
                    name="utilitiesAmount"
                    value={editedExpense.utilitiesAmount}
                    onChange={handleChange}
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    className="w-full p-2 border rounded"
                    name="personalAmount"
                    value={editedExpense.personalAmount}
                    onChange={handleChange}
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    className="w-full p-2 border rounded"
                    name="othersAmount"
                    value={editedExpense.othersAmount}
                    onChange={handleChange}
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    className="w-full p-2 border rounded"
                    name="monthlyAmount"
                    value={editedExpense.monthlyAmount}
                    onChange={handleChange}
                  />
                </td>
                <td className="px-4 py-2">
                  <div className="flex justify-center gap-2">
                    <button
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                      onClick={() =>
                        handleSave(expense._id, user._id)
                      }
                    >
                      Save
                    </button>
                    <button
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </>
            ) : (
              <>
                <td className="px-4 py-2 font-medium text-gray-900">
                  {expense.month}
                </td>
                <td className="px-4 py-2 font-medium text-gray-900">
                  {expense.home}
                </td>
                <td className="px-4 py-2 text-pink-700">
                  ₹{expense.rentAmount}
                </td>
                <td className="px-4 py-2 text-green-700">
                  ₹{expense.foodAmount}
                </td>
                <td className="px-4 py-2 text-yellow-700">
                  ₹{expense.entertainmentAmount}
                </td>
                <td className="px-4 py-2 text-blue-700">
                  ₹{expense.utilitiesAmount}
                </td>
                <td className="px-4 py-2 text-purple-700">
                  ₹{expense.personalAmount}
                </td>
                <td className="px-4 py-2 text-red-700">
                  ₹{expense.othersAmount}
                </td>
                <td className="px-4 py-2 text-emerald-700">
                  ₹{expense.monthlyAmount}
                </td>
                <td className="px-4 py-2">
                  <div className="flex justify-center gap-2">
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      onClick={() =>
                        handleEdit(expenseIndex, expense)
                      }
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>

                    <button
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      onClick={() =>
                        handleDelete(expense._id, user._id)
                      }
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>

                    <NavLink
                      to={`/chart/${expense._id}`}
                      state={expense}
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    >
                      <PieChart className="h-5 w-5" />
                    </NavLink>
                    <NavLink
                      to={`/suggestion/${expense._id}`}
                      state={{ expense }}
                      className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                    >
                      <Lightbulb className="h-5 w-5" />
                    </NavLink>
                  </div>
                </td>
              </>
            )}
          </tr>
        );
      })
    )}
  </tbody>
</table>
</div>