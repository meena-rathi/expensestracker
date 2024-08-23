import React from 'react';

const ExpensesDisplay = ({ expenses }) => {
  return (
    <div>
      <h2>Expenses List</h2>
      {expenses.length > 0 ? (
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              <p><strong>Amount:</strong> ${expense.amount}</p>
              <p><strong>Description:</strong> {expense.description}</p>
              <p><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses found.</p>
      )}
    </div>
  );
};

export default ExpensesDisplay;