import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/BudgetFormToggle.module.css';

const BudgetFormToggle = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValue);
    setInputValue(''); // Clear the input after submission
    setIsFormVisible(false); // Hide form after submission
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
        {isFormVisible ? ' Hide Budget Form' : ' Add Budget Form'}
      </Button>

      {/* Conditionally render the form in a div with a red border */}
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

export default BudgetFormToggle;