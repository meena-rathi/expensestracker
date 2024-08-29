
import React from 'react';
import styles from '../../styles/Home.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import useBudget from '../../Hooks/useBudget';
import BudgetForm from '../../components/BudgetForm';
import BudgetDisplay from '../../components/BudgetDisplay';
import useExpenses from '../../Hooks/useExpenses';
import ExpensesForm from '../../components/ExpensesForm';
import ExpensesDisplay from '../../components/ExpensesDisplay';
import TotalExpenses from '../../components/TotalExpenses';

const Home = () => {
  const user = useCurrentUser();

  // Budget hook
  const { budget, error: budgetError, isBudgetLoaded, handleBudgetSubmit } = useBudget();

  // Expenses hook
  const userId = user?.id; // Safely access user ID
  const { expenses, addExpense, error: expensesError } = useExpenses(userId);

  // Conditional rendering based on user sign-in status
  if (!user) {
    return (
      <div className={styles.signedOutMessage}>
        <h2>Please sign in to view your budget and expenses.</h2>
      </div>
    );
  }

  return (
    <div className={styles.homeContainer}>
      <div className={styles.userInfo}>
        <h1>Welcome, {user.username}!</h1>
      </div>
      
      {/* Budget Section */}
      <div className={styles.budgetFormContainer}>
        <BudgetForm onSubmit={handleBudgetSubmit} />
        {budgetError && <p className={styles.error}>{budgetError}</p>}
      </div>
      <div className={styles.budgetInfo}>
        {isBudgetLoaded ? (
          <BudgetDisplay budget={budget} />
        ) : (
          <p>Loading budget...</p>
        )}
      </div>
 
      {/* Expenses Section */}
      <div className={styles.expensesContainer}>
        <ExpensesForm onSubmit={addExpense} />
        {expensesError && <p className={styles.error}>{expensesError}</p>}
      </div>
      <div>
        <ExpensesDisplay expenses={expenses} />
      </div> 
      
      {/* Total Expenses and Remaining Budget */}
      <div>
        {isBudgetLoaded && expenses && (
          <TotalExpenses budget={budget} expenses={expenses} />
        )}
      </div>
    </div>
  );
};

export default Home;

