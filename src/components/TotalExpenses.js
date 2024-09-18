import React from "react";
import styles from "../styles/total.module.css";

const TotalExpenses = ({ budget = 0, expenses = [] }) => {
  const totalExpenses = expenses.reduce((total, expense) => {
    return total + parseFloat(expense.amount || 0);
  }, 0);

  const remainingBudget = budget - totalExpenses;

  return (
    <div>
      <p className={styles.expensesDisplay}>Total Expenses: ${totalExpenses.toFixed(2)}</p>
      {remainingBudget < 0 ? (
        <p className={`${styles.expensesDisplay} ${styles.negativeBudget}`}>
          Remaining Budget: <span className={styles.dangerText}>${remainingBudget.toFixed(2)}</span>
          <span className={styles.warningMessage}> (Warning: Budget is negative!)</span>
        </p>
      ) : (
        <p className={styles.expensesDisplay}>
          Remaining Budget: ${remainingBudget.toFixed(2)}
        </p>
      )}
    </div>
  );
};

export default TotalExpenses;
