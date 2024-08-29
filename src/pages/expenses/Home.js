// import React from 'react';
// import styles from '../../styles/Home.module.css';
// import { useCurrentUser } from '../../contexts/CurrentUserContext';
// import useBudget from '../../Hooks/useBudget';
// import BudgetForm from '../../components/BudgetForm';
// import BudgetDisplay from '../../components/BudgetDisplay';
// import useCategories from '../../Hooks/useCategories';
// import CategoryForm from '../../components/CategoryForm';
// import CategoryList from '../../components/CategoryList';
// import ExpensesForm from '../../components/ExpensesForm';
// import useExpenses from '../../Hooks/useExpenses';
// import ExpenseDisplay from '../../components/ExpensesDisplay';
// import TotalExpenses from '../../components/TotalExpenses';

// const Home = () => {
//   const user = useCurrentUser();
   
//   // Budget hook
//   const { budget, error: budgetError, isBudgetLoaded, handleBudgetSubmit } = useBudget();
  
//   // Categories hook
//   const { categories, addCategory, error, isLoaded } = useCategories();
  
//   // Expenses hook
//   const userId = user?.id; // Safely access user ID

//   const { expenses, addExpense, error: expensesError } = useExpenses(userId);
//   // const { expenses, addExpense, error: expensesError, isLoaded: isExpensesLoaded } = useExpenses(user.id);
//   const totalExpenses = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);

//   return (
//     <div className={styles.homeContainer}>
//       {user && (
//         <div className={styles.userInfo}>
//           <h1>Welcome, {user.username}!</h1>
//         </div>
//       )}
      
//       {/* Budget Section */}
//       <div className={styles.budgetFormContainer}>
//         <BudgetForm onSubmit={handleBudgetSubmit} />
//         {budgetError && <p className={styles.error}>{budgetError}</p>}
//       </div>
//       <div className={styles.budgetInfo}>
//         {isBudgetLoaded ? (
//           <BudgetDisplay budget={budget} />
//         ) : (
//           <p>Loading budget...</p>
//         )}
//       </div>
 
//       {/* Categories Section */}
//       {/* <div className={styles.homeContainer}>
//       <div className={styles.categoriesContainer}>
//         <CategoryForm onSubmit={addCategory} />
//         {error && <p className={styles.error}>{error}</p>}
//         {isLoaded ? (
//           <CategoryList categories={categories} />
//         ) : (
//           <p>Loading categories...</p>
//         )}
//       </div>
//     </div> */}

//       {/* Expenses Section */}
//       <div className={styles.expensesContainer}>
//         {isLoaded ? (
//           <ExpensesForm categories={categories} onSubmit={addExpense} />
//         ) : (
//           <p>Loading categories for expenses...</p>
//         )}
//         {expensesError && <p className={styles.error}>{expensesError}</p>}
//       </div>
//       <div>
//       <ExpenseDisplay expenses={expenses} />
//       </div>
//       <div>
//         <TotalExpenses amount={totalExpenses} />
//       </div>
//     </div>
//   );
// };

// export default Home;

// import React from 'react';
// import styles from '../../styles/Home.module.css';
// import { useCurrentUser } from '../../contexts/CurrentUserContext';
// import useBudget from '../../Hooks/useBudget';
// import BudgetForm from '../../components/BudgetForm';
// import BudgetDisplay from '../../components/BudgetDisplay';
// import useCategories from '../../Hooks/useCategories';
// import ExpensesForm from '../../components/ExpensesForm';
// import useExpenses from '../../Hooks/useExpenses';
// import ExpenseDisplay from '../../components/ExpensesDisplay';
// import TotalExpenses from '../../components/TotalExpenses';

// const Home = () => {
//   const user = useCurrentUser();
//   if (!user) {
//     return (
//       <div className={styles.signedOutMessage}>
//         <h2>Please sign in to view your budget and expenses.</h2>
//       </div>
//     );
//   }
//   // Budget hook
//   const { budget, error: budgetError, isBudgetLoaded, handleBudgetSubmit } = useBudget();
  
//   // Categories hook
//   // const { categories, addCategory, error, isLoaded } = useCategories();
  
//   // Expenses hook
//   const userId = user?.id; // Safely access user ID
//   const { expenses, addExpense, error: expensesError } = useExpenses(userId);

//   return (
//     <div className={styles.homeContainer}>
//       {user && (
//         <div className={styles.userInfo}>
//           <h1>Welcome, {user.username}!</h1>
//         </div>
//       )}
      
//       {/* Budget Section */}
//       <div className={styles.budgetFormContainer}>
//         <BudgetForm onSubmit={handleBudgetSubmit} />
//         {budgetError && <p className={styles.error}>{budgetError}</p>}
//       </div>
//       <div className={styles.budgetInfo}>
//         {isBudgetLoaded ? (
//           <BudgetDisplay budget={budget} />
//         ) : (
//           <p>Loading budget...</p>
//         )}
//       </div>
 
//       {/* Expenses Section */}
//        <div className={styles.expensesContainer}>
//         <ExpensesForm  onSubmit={addExpense} />
       
//         {expensesError && <p className={styles.error}>{expensesError}</p>}
//       </div>
   
      
//       {/* Total Expenses and Remaining Budget */}
//       <div>
//         {isBudgetLoaded && expenses && (
//           <TotalExpenses budget={budget} expenses={expenses} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
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