// import React from 'react';

// const BudgetDisplay = ({ budget }) => {
  
//   return (
//     <div>
//       <p>Current Budget: {budget !== null ? `$${parseFloat(budget).toFixed(2)}` : 'Loading...'}</p>
    
//     </div>
  
//   );

// };
// export default BudgetDisplay;
import React from 'react';
const BudgetDisplay = ({ budget }) => {
  return (
    <div>
      <p>Current Budget: {budget !== null ? `$${budget}` : 'Loading...'}</p>
    </div>
  );
};

export default BudgetDisplay;