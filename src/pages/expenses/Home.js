// import React from 'react';
// import { Container, Row, Col, Alert } from 'react-bootstrap';
// import { useCurrentUser } from '../../contexts/CurrentUserContext';
// import useBudget from '../../Hooks/useBudget';
// import BudgetForm from '../../components/BudgetForm';
// import useExpenses from '../../Hooks/useExpenses';
// import ExpensesDisplay from '../../components/ExpensesDisplay';
// import TotalExpenses from '../../components/TotalExpenses';
// import styles from '../../styles/Home.module.css';

// const Home = () => {
//   const user = useCurrentUser();

//   // Budget hook
//   const { budget, error: budgetError, isBudgetLoaded, handleBudgetSubmit } = useBudget();

//   // Expenses hook
//   const userId = user?.id; // Safely access user ID
//   const { expenses } = useExpenses(userId);

//   // Conditional rendering based on user sign-in status
//   if (!user) {
//     return (
//       <Container className={`text-center mt-4 ${styles['overflow-hidden']}`}>
//         <h2 className={styles['text-custom']}>Please sign in to view your budget and expenses.</h2>
//       </Container>
//     );
//   }

//   return (
//     <Container className={`mt-4 p-4 shadow ${styles['container']}`}>
//     <Row className="align-items-center mb-4">
//       <Col xs={12} md={6}>
//         <h1 className={`${styles['displayStyle']} ${styles['text-custom']}`}>
//           Welcome, {user.username}!
//         </h1>
//       </Col>
//       <Col xs={12} md={6} className="text-md-end"> {/* Align right here */}
//         {isBudgetLoaded ? (
//           <p className={`${styles['text-custom']} ${styles['text-success-custom']}`}>
//             Current Budget: ${budget}
//           </p>
//         ) : (
//           <p className={styles['text-custom']}>Loading budget...</p>
//         )}
//       </Col>
//     </Row>
  
//     {/* Budget Form Section */}
//     <Row className="mb-4">
//       <Col xs={12}>
//         <BudgetForm onSubmit={handleBudgetSubmit} />
//         {budgetError && <Alert variant="danger" className={styles['alert-danger']}>{budgetError}</Alert>}
//       </Col>
//     </Row>
  
//     {/* Expenses Section */}
//     <Row className="mb-4">
//       <Col xs={12}>
//         <ExpensesDisplay expenses={expenses} />
//       </Col>
//     </Row>
  
//     {/* Total Expenses and Remaining Budget */}
//     <Row>
//       <Col xs={12}>
//         {isBudgetLoaded && expenses && (
//           <TotalExpenses budget={budget} expenses={expenses} />
//         )}
//       </Col>
//     </Row>
//   </Container>
//   )};  
// export default Home;

import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import useBudget from '../../Hooks/useBudget';
import BudgetForm from '../../components/BudgetForm';
import useExpenses from '../../Hooks/useExpenses';
import ExpensesDisplay from '../../components/ExpensesDisplay';
import styles from '../../styles/Home.module.css';

const Home = () => {
  const user = useCurrentUser();

  // Budget hook
  const { budget, error: budgetError, isBudgetLoaded, handleBudgetSubmit } = useBudget();

  // Expenses hook
  const userId = user?.id; // Safely access user ID
  const { expenses } = useExpenses(userId);

  // Function to update totals - implement your own logic
  const updateTotals = () => {
    // Your logic to update totals goes here
    console.log('Update totals function called');
  };

  // Conditional rendering based on user sign-in status
  if (!user) {
    return (
      <Container className={`text-center mt-4 ${styles['overflow-hidden']}`}>
        <h2 className={styles['text-custom']}>Please sign in to view your budget and expenses.</h2>
      </Container>
    );
  }

  return (
    <Container className={`mt-4 p-4 shadow ${styles['container']}`}>
      <Row className="align-items-center mb-4">
        <Col xs={12} md={6}>
          <h1 className={`${styles['displayStyle']} ${styles['text-custom']}`}>
            Welcome, {user.username}!
          </h1>
        </Col>
        <Col xs={12} md={6} className="text-md-end"> {/* Align right here */}
          {isBudgetLoaded ? (
            <p className={`${styles['text-custom']} ${styles['text-success-custom']}`}>
              Current Budget: ${budget}
            </p>
          ) : (
            <p className={styles['text-custom']}>Loading budget...</p>
          )}
        </Col>
      </Row>

      {/* Budget Form Section */}
      <Row className="mb-4">
        <Col xs={12}>
          <BudgetForm onSubmit={handleBudgetSubmit} />
          {budgetError && <Alert variant="danger" className={styles['alert-danger']}>{budgetError}</Alert>}
        </Col>
      </Row>

      {/* Expenses Section */}
      <Row className="mb-4">
        <Col xs={12}>
          <ExpensesDisplay expenses={expenses} budget={budget} updateTotals={updateTotals} />
        </Col>
      </Row>
      
      {/* Total Expenses and Remaining Budget */}
      <Row>
        <Col xs={12}>
          {/* Uncomment if you want to use TotalExpenses directly */}
          {/* {isBudgetLoaded && expenses && (
            <TotalExpenses budget={budget} expenses={expenses} />
          )} */}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
