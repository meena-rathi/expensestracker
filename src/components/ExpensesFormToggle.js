import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/BudgetFormToggle.module.css';

const ExpensesFormToggle = ({ onSubmit }) => {
  const [amount, setAmount] = useState(''); // Define amount state
  const [description, setDescription] = useState(''); // Define description state
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with both amount and description
    const expenseData = {
      amount,
      description,
    };

    // Pass the expense data to the onSubmit handler
    onSubmit(expenseData);

    // Clear the inputs after submission
    setAmount('');
    setDescription('');

    // Hide form after submission
    setIsFormVisible(false);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className={styles.container}>
      {/* Toggle Button */}
      <Button variant="link" onClick={toggleFormVisibility}>
        {isFormVisible ? (
          <FontAwesomeIcon icon={faMinus} />
        ) : (
          <FontAwesomeIcon icon={faPlus} />
        )}
        {isFormVisible ? ' Hide Expense Form' : ' Add Expense Form'}
      </Button>

      {/* Conditionally render the form in a div with a red border */}
      {isFormVisible && (
        <div className={styles.formContainer}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="amount">
              <Form.Label>Set Expense Amount</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Enter description"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Expense
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default ExpensesFormToggle;