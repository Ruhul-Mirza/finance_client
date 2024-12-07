return (
  <div>
    <h2>Expenses Data</h2>
    <table>
      <thead>
        <tr>
          <th>Month</th>
          <th>Home</th>
          <th>Rent</th>
          <th>Food</th>
          <th>Entertainment</th>
          <th>Utilities</th>
          <th>Personal</th>
          <th>Others</th>
          <th>Monthly Salary</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenseData.map((user, userIndex) =>
          user.expenses.map((expense, expenseIndex) => {
            return (
              <tr key={expense._id}>
                {editIndex === expenseIndex ? (
                  <>
                    <td>
                      <select
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
                    <td>
                      <select
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
                    <td>
                      <input
                        name="rentAmount"
                        value={editedExpense.rentAmount}
                        onChange={handleChange}
                        disabled={editedExpense.home === "own"}
                      />
                    </td>
                    <td>
                      <input
                        name="foodAmount"
                        value={editedExpense.foodAmount}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="entertainmentAmount"
                        value={editedExpense.entertainmentAmount}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="utilitiesAmount"
                        value={editedExpense.utilitiesAmount}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="personalAmount"
                        value={editedExpense.personalAmount}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="othersAmount"
                        value={editedExpense.othersAmount}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="monthlyAmount"
                        value={editedExpense.monthlyAmount}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleSave(expense._id, user._id)}>
                        Save
                      </button>
                      <button onClick={handleCancel}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{expense.month}</td>
                    <td>{expense.home}</td>
                    <td>{expense.rentAmount}</td>
                    <td>{expense.foodAmount}</td>
                    <td>{expense.entertainmentAmount}</td>
                    <td>{expense.utilitiesAmount}</td>
                    <td>{expense.personalAmount}</td>
                    <td>{expense.othersAmount}</td>
                    <td>{expense.monthlyAmount}</td>
                    <td>
                      <button onClick={() => handleEdit(expenseIndex, expense)}>
                        Edit
                      </button>
                      <NavLink to={`/chart/${expense._id}`} state={expense}>
                        <button>Chart</button>
                      </NavLink>
                      <NavLink
                        to={`/suggestion/${expense._id}`}
                        state={{ expense }}
                      >
                        <button>Get Suggestion</button>
                      </NavLink>
                      <button
                        onClick={() => handleDelete(expense._id, user._id)}
                      >
                        Delete
                      </button>
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
);