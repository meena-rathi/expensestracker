import React from 'react';
import useExpenses from '../../Hooks/useExpenses';
import ExpenseDisplay from '../../components/ExpensesDisplay';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/Home.module.css';

const ViewExpenses = () => {
  const user = useCurrentUser();
  const userId = user?.id; // Ensure userId is available

  const { expenses, error: expensesError } = useExpenses(userId);

  return (
    <div>
     
      {expensesError && <p className={styles.error}>{expensesError}</p>}
      <div className={styles.expensesContainer}>
        <ExpenseDisplay expenses={expenses} />
      </div>
    </div>
  );
};

export default ViewExpenses;