import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { axiosRes } from "../api/axiosDefaults";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/BudgetFormToggle.module.css';

const ExpensesForm = ({ onSubmit }) => {
  const [inputAmount, setInputAmount] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [amountError, setAmountError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [submissionError, setSubmissionError] = useState('');
  const [success, setSuccess] = useState('');

  // Amount validation: numbers only
  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d+$/.test(value)) {
      setInputAmount(value);
      setAmountError(''); // Clear amount error if valid
    } else {
      setAmountError('Amount must contain only numeric values.');
    }
  };

  // Description validation: alphabetic only, no spaces
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z]+$/.test(value)) {
      setInputDescription(value);
      setDescriptionError(''); // Clear description error if valid
    } else {
      setDescriptionError('Description must contain only alphabetic characters without spaces.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputAmount || !inputDescription) {
      setSubmissionError('Please fill in all fields with valid data.');
      return;
    }

    const newExpense = {
      amount: inputAmount,
      description: inputDescription,
      date: new Date().toISOString(),
    };

    try {
      const response = await axiosRes.post('/expenses/', newExpense);
      onSubmit(response.data);
      setInputAmount('');
      setInputDescription('');
      setSubmissionError('');
      setSuccess('Expense added successfully!');
      setIsFormVisible(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setSubmissionError('Failed to add expense. Please try again.');
      setTimeout(() => setSubmissionError(''), 3000);
    }
  };

  const toggleFormVisibility = () => setIsFormVisible((prev) => !prev);

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
      <Button
  variant="link"
  onClick={toggleFormVisibility}
  className={`${styles.toggleButton} ${styles.addExpensesButton}`} // Add the new class here
>
  <FontAwesomeIcon icon={isFormVisible ? faMinus : faPlus} />
  {isFormVisible ? ' Hide Expenses Form' : ' Add Expenses Form'}
</Button>
</div>
      {/* <Button
        variant="link"
        onClick={toggleFormVisibility}
        className={styles.toggleButton}
      >
        <FontAwesomeIcon icon={isFormVisible ? faMinus : faPlus} />
        {isFormVisible ? ' Hide Expenses Form' : ' Add Expenses Form'}
      </Button> */}

      {success && <Alert variant="success">{success}</Alert>}
      {submissionError && <Alert variant="danger">{submissionError}</Alert>}

      {isFormVisible && (
        <div className={styles.formContainer}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="text"
                value={inputAmount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
                isInvalid={!!amountError} // Trigger error for the form field
              />
              <Form.Control.Feedback type="invalid">
                {amountError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={inputDescription}
                onChange={handleDescriptionChange}
                placeholder="Enter description"
                isInvalid={!!descriptionError} // Trigger error for the form field
              />
              <Form.Control.Feedback type="invalid">
                {descriptionError}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className={styles.submitButton}
              disabled={!!amountError || !!descriptionError} // Disable submit if any field has an error
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

