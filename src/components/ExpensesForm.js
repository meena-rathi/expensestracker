
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'; // Import Alert for success message
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/BudgetFormToggle.module.css';

const ExpensesForm = ({ onSubmit }) => {
  const [inputAmount, setInputAmount] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // State for success message

  // Handler for amount change with number validation
  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setInputAmount(value);
      setError(''); // Clear error if valid
    } else {
      setError('Amount must be a valid number');
    }
  };

  // Handler for description change with string validation
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setInputDescription(value);
      setError(''); // Clear error if valid
    } else {
      setError('Description must only contain letters and spaces');
    }
  };

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

    // Set success message
    setSuccess('Expense added successfully!');
   
    // Hide the form after submission
    setIsFormVisible(false);

    // Remove the success message after 3 seconds
    setTimeout(() => setSuccess(''), 3000);
  };

  // Toggle form visibility
  const toggleFormVisibility = () => setIsFormVisible((prev) => !prev);

  return (
    <div className={styles.container}>
      {/* Toggle Button */}
      <Button 
        variant="link" 
        onClick={toggleFormVisibility} 
        className={styles.toggleButton}
      >
        <FontAwesomeIcon icon={isFormVisible ? faMinus : faPlus} />
        {isFormVisible ? ' Hide Expenses Form' : ' Add Expenses Form'}
      </Button>

      {success && <Alert variant="success">{success}</Alert>}

      {/* Conditionally render the form */}
      {isFormVisible && (
        <div className={styles.formContainer}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={inputAmount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
                isInvalid={!!error && error.includes('Amount')}
              />
              <Form.Control.Feedback type="invalid">
                {error.includes('Amount') && error}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={inputDescription}
                onChange={handleDescriptionChange}
                placeholder="Enter description"
                isInvalid={!!error && error.includes('Description')}
              />
              <Form.Control.Feedback type="invalid">
                {error.includes('Description') && error}
              </Form.Control.Feedback>
            </Form.Group>
            <Button 
              variant="primary" 
              type="submit" 
              className={styles.submitButton}
            >
              Add Expense
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default ExpensesForm;