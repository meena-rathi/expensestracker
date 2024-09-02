
// import React from 'react';
// import styles from '../../styles/Home.module.css';
// import { useCurrentUser } from '../../contexts/CurrentUserContext';
// import useBudget from '../../Hooks/useBudget';
// import BudgetForm from '../../components/BudgetForm';
// import BudgetDisplay from '../../components/BudgetDisplay';
// import useExpenses from '../../Hooks/useExpenses';
// import ExpensesForm from '../../components/ExpensesForm';
// import ExpensesDisplay from '../../components/ExpensesDisplay';
// import TotalExpenses from '../../components/TotalExpenses';

// const Home = () => {
//   const user = useCurrentUser();

//   // Budget hook
//   const { budget, error: budgetError, isBudgetLoaded, handleBudgetSubmit } = useBudget();

//   // Expenses hook
//   const userId = user?.id; // Safely access user ID
//   const { expenses, addExpense, error: expensesError } = useExpenses(userId);

//   // Conditional rendering based on user sign-in status
//   if (!user) {
//     return (
//       <div className={styles.signedOutMessage}>
//         <h2>Please sign in to view your budget and expenses.</h2>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.homeContainer}>
//       <div className={styles.userInfo}>
//         <h1>Welcome, {user.username}!</h1>
//       </div>
      
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
//       <div className={styles.expensesContainer}>
//         <ExpensesForm onSubmit={addExpense} />
//         {expensesError && <p className={styles.error}>{expensesError}</p>}
//       </div>
//       <div>
//         <ExpensesDisplay expenses={expenses} />
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
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import useBudget from '../../Hooks/useBudget';
import BudgetForm from '../../components/BudgetForm';
import BudgetDisplay from '../../components/BudgetDisplay';
import useExpenses from '../../Hooks/useExpenses';
import ExpensesForm from '../../components/ExpensesForm';
import ExpensesDisplay from '../../components/ExpensesDisplay';
import TotalExpenses from '../../components/TotalExpenses';
import styles from '../../styles/Home.module.css'; // Ensure this import is correct

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
      <Container className={`text-center mt-4 ${styles['overflow-hidden']}`}>
        <h2>Please sign in to view your budget and expenses.</h2>
      </Container>
    );
  }

  return (
    <Container className={`mt-4 ${styles['overflow-hidden']}`}>
      <Row className="align-items-center mb-4">
        <Col xs={12} md={6}>
          <h1>Welcome, {user.username}!</h1>
        </Col>
        <Col xs={12} md={6} className="text-md-end">
          {isBudgetLoaded ? (
            <BudgetDisplay budget={budget} />
          ) : (
            <p>Loading budget...</p>
          )}
        </Col>
      </Row>

      {/* Budget Section */}
      <Row className="mb-4">
        <Col xs={12}>
          <BudgetForm onSubmit={handleBudgetSubmit} />
          {budgetError && <Alert variant="danger">{budgetError}</Alert>}
        </Col>
      </Row>

      {/* Expenses Section */}
      <Row className="mb-4">
        <Col xs={12}>
          <ExpensesForm onSubmit={addExpense} />
          {expensesError && <Alert variant="danger">{expensesError}</Alert>}
        </Col>
      </Row>
      <Row className="mb-4">
        <Col xs={12}>
          <ExpensesDisplay expenses={expenses} />
        </Col>
      </Row>

      {/* Total Expenses and Remaining Budget */}
      <Row>
        <Col xs={12}>
          {isBudgetLoaded && expenses && (
            <TotalExpenses budget={budget} expenses={expenses} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;