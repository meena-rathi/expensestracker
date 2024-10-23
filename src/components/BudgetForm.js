import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/BudgetFormToggle.module.css';

const BudgetForm = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim() === '' || Number(inputValue) <= 0) {
      setErrorMessage('Please enter a valid budget amount greater than zero.');
      return;
    }

    onSubmit(Number(inputValue));
    setInputValue('');
    setIsFormVisible(false);
    setErrorMessage('');
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Button
          variant="link"
          onClick={toggleFormVisibility}
          className={`${styles.toggleButton} d-flex align-items-center`}
          aria-label={isFormVisible ? 'Hide Budget Form' : 'Show Budget Form'}
        >
          <FontAwesomeIcon
            icon={isFormVisible ? faMinus : faPlus}
            className="me-2"
          />
          {isFormVisible ? 'Hide Budget Form' : 'Add Budget Form'}
        </Button>
      </div>

      {showSuccessMessage && (
        <Alert variant="success" className="mt-3">
          Budget successfully updated!
        </Alert>
      )}

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
            <Button variant="primary" type="submit" className="mt-3">
              Add Budget
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default BudgetForm;
