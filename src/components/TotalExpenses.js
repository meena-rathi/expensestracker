import React from "react";
import styles from "../styles/Home.module.css"; // Ensure this import is correct

const TotalExpenses = ({ budget = 0, expenses = [] }) => {
  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, expense) => {
    return total + parseFloat(expense.amount || 0);
  }, 0);

  // Calculate the remaining budget
  const remainingBudget = budget - totalExpenses;

  return (
    <div>
      <p className={styles.expensesDisplay}>Total Expenses: ${totalExpenses.toFixed(2)}</p>
      <p className={styles.expensesDisplay}>Remaining Budget: ${remainingBudget.toFixed(2)}</p>
    </div>
  );
};

export default TotalExpenses;