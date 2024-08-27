// import React from "react";

// const TotalExpenses = ({ budget = 0, expenses = [] }) => {
//   // Ensure expenses is an array and calculate total expenses
//   const totalExpenses = expenses.reduce((total, expense) => {
//     return total + parseFloat(expense.amount || 0);
//   }, 0);

//   // Calculate the remaining budget
//   const remainingBudget = budget - totalExpenses;

//   return (
//     <div>
//       <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
//       <p>Remaining Budget: ${remainingBudget.toFixed(2)}</p>
//     </div>
//   );
// };

// export default TotalExpenses;

import React from "react";

const TotalExpenses = ({ budget = 0, expenses = [] }) => {
  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, expense) => {
    return total + parseFloat(expense.amount || 0);
  }, 0);

  // Calculate the remaining budget
  const remainingBudget = budget - totalExpenses;

  return (
    <div>
      <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
      <p>Remaining Budget: ${remainingBudget.toFixed(2)}</p>
    </div>
  );
};

export default TotalExpenses;