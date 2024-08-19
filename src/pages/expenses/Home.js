// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from '../../styles/Home.module.css';  // Import your CSS file
// import { useCurrentUser } from '../../contexts/CurrentUserContext'; // Custom hook for user context
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';

// const Home = () => {
//   const user = useCurrentUser();  // Get current user from context
//   const [budget, setBudget] = useState('');
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);  // New state for success message
//   const [isBudgetLoaded, setIsBudgetLoaded] = useState(false); // To track if budget data is loaded

//   useEffect(() => {
//     const fetchBudget = async () => {
//       try {
//         const response = await axios.get('/api/budget/');
//         console.log('Budget Response:', response.data);
//         if (response.data && response.data.length > 0) {
//           setBudget(response.data[0].amount); // Assuming one budget per user
//         }
//         setIsBudgetLoaded(true); // Set to true after fetching budget data
//       } catch (err) {
//         console.error('Failed to load budget data:', err.response ? err.response.data : err.message);
//         // setError('Failed to load budget data');
//         setIsBudgetLoaded(true); // Set to true even on error to stop loading spinner if any
//       }
//     };
//     fetchBudget();
//   }, []);

//   const handleBudgetChange = (e) => {
//     setBudget(e.target.value);
//   };

//   const handleBudgetSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('/budgets/', { amount: budget });
//       setSuccess('Budget updated successfully');
//       setError(null); // Clear any previous errors
//     } catch (err) {
//       setError('Failed to update budget');
//       setSuccess(null); // Clear any previous success messages
//     }
//   };

//   console.log('User:', user);  // Debugging line

//   return (
//     <div className={styles.homeContainer}>
//       {user && (
//         <div className={styles.userInfo}>
//           <h1>Welcome, {user.username}!</h1>
//         </div>
//       )}
//       <div className={styles.budgetFormContainer}>
//         <Form onSubmit={handleBudgetSubmit}>
//           <Form.Group controlId="budget">
//             <Form.Label>Set Monthly Budget Amount</Form.Label>
//             <Form.Control
//               type="number"
//               value={budget}
//               onChange={handleBudgetChange}
//               placeholder="Enter your budget"
//             />
//           </Form.Group>
//           <Button variant="primary" type="submit">Add Budget</Button>
//         </Form>
//         {success && <p className={styles.success}>{success}</p>}
//         {error && <p className={styles.error}>{error}</p>}
//       </div>
//       {isBudgetLoaded && !error && !success && (
//         <div className={styles.budgetInfo}>
//           <p>Current Budget: {budget}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Home;

import React from 'react';
import styles from '../../styles/Home.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import useBudget from '../../Hooks/useBudget';
import BudgetForm from '../../components/BudgetForm';
import BudgetDisplay from '../../components/BudgetDisplay';
import useCategories from '../../Hooks/useCategories';
import CategoryForm from '../../components/CategoryForm';
import CategoryList from '../../components/CategoryList';
import ExpensesForm from '../../components/ExpensesForm';
import useExpenses from '../../Hooks/useExpenses';


const Home = () => {
  const user = useCurrentUser();
  const { budget, error, isBudgetLoaded, handleBudgetSubmit } = useBudget();
  const { categories, addCategory, error: categoriesError } = useCategories();
  const { expenses, addExpense, error: expensesError } = useExpenses();

  return (
    <div className={styles.homeContainer}>
      {user && (
        <div className={styles.userInfo}>
          <h1>Welcome, {user.username}!</h1>
        </div>
      )}
      <div className={styles.budgetFormContainer}>
        <BudgetForm onSubmit={handleBudgetSubmit} />
        {error && <p className={styles.error}>{error}</p>}
      </div>
      <div className={styles.budgetInfo}>
        {isBudgetLoaded ? (
          <BudgetDisplay budget={budget} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
 
      <div className={styles.categoriesContainer}>
        <CategoryForm onSubmit={addCategory} />
        {categoriesError && <p className={styles.error}>{categoriesError}</p>}
        <CategoryList categories={categories} /> 
        </div>
      <div className={styles.expensesContainer}>
        <ExpensesForm categories={categories} onSubmit={addExpense} /> {/* Pass categories */}
        {expensesError && <p className={styles.error}>{expensesError}</p>}
      </div>
    </div>
  );
};

export default Home;