
// };

// export default ExpensesForm;
//   const [amount, setAmount] = useState('');
//   const [description, setDescription] = useState('');
//   const [error, setError] = useState('');
//   const currentUser = useCurrentUser();

//   const handleAmountChange = (e) => setAmount(e.target.value);
//   const handleDescriptionChange = (e) => setDescription(e.target.value);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!amount || !description) {
//       setError('Please fill in all fields');
//       return;
//     }

//     if (currentUser) {
//       const expenseData = {
//         amount,
//         description,
//         user: currentUser.id,
//       };

//       onSubmit(expenseData);
//       setAmount('');
//       setDescription('');
//     } else {
//       setError('You must be logged in to add an expense');
//     }
//   };

//   return (
//     <Form className={styles.expensesForm} onSubmit={handleSubmit}>
//       <Form.Group controlId="amount" className={styles.formGroup}>
//         <Form.Label>Amount</Form.Label>
//         <Form.Control
//           type="number"
//           placeholder="Enter amount"
//           value={amount}
//           onChange={handleAmountChange}
//           className={styles.inputField}
//         />
//       </Form.Group>

//       <Form.Group controlId="description" className={styles.formGroup}>
//         <Form.Label>Description</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter description"
//           value={description}
//           onChange={handleDescriptionChange}
//           className={styles.inputField}
//         />
//       </Form.Group>

//       <Button type="submit" className={styles.submitButton} variant="primary">
//         Add Expense
//       </Button>
//       {error && <p className={styles.errorMessage}>{error}</p>}
//     </Form>
//   );
// };





import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/BudgetFormToggle.module.css';

const BudgetForm = ({ onSubmit }) => {
  const [inputAmount, setInputAmount] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [error, setError] = useState(''); // State for error messages

  // Handler for amount change
  const handleAmountChange = (e) => setInputAmount(e.target.value);

  // Handler for description change
  const handleDescriptionChange = (e) => setInputDescription(e.target.value);

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!inputAmount || !inputDescription) {
      setError('Please fill in all fields');
      return; // Do not submit if there are errors
    }

    // Pass the data to the onSubmit handler
    onSubmit({ amount: inputAmount, description: inputDescription });

    // Clear the inputs and error message
    setInputAmount('');
    setInputDescription('');
    setError('');

    // Hide the form after submission
    setIsFormVisible(false);
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
            <Form.Group controlId="amount">
              <Form.Label>Set Expense Amount</Form.Label>
              <Form.Control
                type="number"
                value={inputAmount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={inputDescription}
                onChange={handleDescriptionChange}
                placeholder="Enter description"
              />
            </Form.Group>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button variant="primary" type="submit">
              Add Expense
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default BudgetForm;