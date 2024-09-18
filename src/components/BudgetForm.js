import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/BudgetFormToggle.module.css';

const BudgetForm = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check for validation
    if (inputValue.trim() === '' || Number(inputValue) <= 0) {
      setErrorMessage('Please enter a valid budget amount greater than zero.');
      return;
    }

    // If valid, submit the form
    onSubmit(Number(inputValue)); // Ensure the input value is sent as a number
    setInputValue(''); // Clear the input field
    setIsFormVisible(false); // Hide the form
    setErrorMessage(''); // Reset the error message on success
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className={styles.container}>
      <Button variant="link" onClick={toggleFormVisibility}>
        <FontAwesomeIcon icon={isFormVisible ? faMinus : faPlus} />
        {isFormVisible ? ' Hide Budget Form' : ' Add Budget Form'}
      </Button>

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
                isInvalid={errorMessage !== ''}
              />
              <Form.Control.Feedback type="invalid">
                {errorMessage}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Budget
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default BudgetForm;
