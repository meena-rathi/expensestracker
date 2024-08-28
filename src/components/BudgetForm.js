// import React, { useState } from 'react';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import BudgetFormToggle from './BudgetFormToggle';

// const BudgetForm= () => {
//   const handleBudgetSubmit = (budget) => {
//     console.log('Budget submitted:', budget);
//   };

//   return (
//     <div>
//       <BudgetFormToggle onSubmit={handleBudgetSubmit} />
//     </div>
//   );
// };

// export default BudgetForm;



//working code


// const BudgetForm = ({ onSubmit }) => {
//   const [inputValue, setInputValue] = useState('');

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(inputValue);
//     setInputValue(''); // Clear the input after submission
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group controlId="budget">
//         <Form.Label>Set Monthly Budget Amount</Form.Label>
//         <Form.Control
//           type="number"
//           value={inputValue}
//           onChange={handleInputChange}
//           placeholder="Enter your budget"
//         />
//       </Form.Group>
//       <Button variant="primary" type="submit">Add Budget</Button>
//     </Form>
//   );
// };

// export default BudgetForm;



import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/BudgetFormToggle.module.css';

const BudgetForm = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState(''); // State for the budget amount
  const [isFormVisible, setIsFormVisible] = useState(false); // State for form visibility

  // Handler for input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValue); // Pass the input value to the parent component
    setInputValue(''); // Clear the input field
    setIsFormVisible(false); // Hide the form after submission
  };

  // Toggle form visibility
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className={styles.container}>
      {/* Toggle Button */}
      <Button variant="link" onClick={toggleFormVisibility}>
        <FontAwesomeIcon icon={isFormVisible ? faMinus : faPlus} />
        {isFormVisible ? ' Hide Budget Form' : ' Add Budget Form'}
      </Button>

      {/* Conditionally render the form */}
      {isFormVisible && (
        <div className={styles.formContainer}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="budget">
              <Form.Label>Set Monthly Budget Amount</Form.Label>
              <Form.Control
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter your budget"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Budget
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default BudgetForm;