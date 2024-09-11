import React from 'react';

const BudgetDisplay = ({ budget }) => {
  return (
    <div>
      <p>Current Budget: {budget !== null ? `$${budget}` : 'Loading...'}</p>
    </div>
  );
};

export default BudgetDisplay;