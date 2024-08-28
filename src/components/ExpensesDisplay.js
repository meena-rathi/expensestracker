import React from 'react';
import styles from '../styles/ExpensesList.module.css';

const ExpensesDisplay = ({ expenses }) => {
  return (
    <div>
      <h2>Expenses List</h2>
      {expenses.length > 0 ? (
        <table className={styles.expenses}>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td> ${expense.amount}</td>
              <td>{expense.description}</td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              {/* <t/> */}
            </tr>
          ))}
        </table>
      ) : (
        <p>No expenses found.</p>
      )}
    </div>
  );
};

export default ExpensesDisplay;