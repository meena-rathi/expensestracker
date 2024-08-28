import React from 'react';
import useExpenses from '../../Hooks/useExpenses';
import ExpenseDisplay from '../../components/ExpensesDisplay';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/Home.module.css';
import useBudget from '../../Hooks/useBudget';
import TotalExpenses from '../../components/TotalExpenses';
import BudgetDisplay from '../../components/BudgetDisplay';

const ViewExpenses = () => {
  const user = useCurrentUser();
  const userId = user?.id; // Ensure userId is available

  const { expenses, error: expensesError } = useExpenses(userId);
  const { budget, error: budgetError, isBudgetLoaded, handleBudgetSubmit } = useBudget();

  return (

<div className={styles.viewExpensesContainer}>
      {/* Budget Section */}
      <div className={styles.budgetSection}>
        <h2>Current Budget</h2>
        {budgetError && <p className={styles.error}>{budgetError}</p>}
        {isBudgetLoaded ? (
          <BudgetDisplay budget={budget} />
        ) : (
          <p>Loading budget...</p>
        )}
      </div>


      <div className={styles.expensesContainer}>
        <ExpenseDisplay expenses={expenses} />
      </div>

      <div>
        {isBudgetLoaded && expenses && (
          <TotalExpenses budget={budget} expenses={expenses} />
        )}
      </div>
    </div>
  );
};

export default ViewExpenses;