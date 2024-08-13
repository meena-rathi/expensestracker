import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const BudgetForm = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValue);
    setInputValue(''); // Clear the input after submission
  };

  return (
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
      <Button variant="primary" type="submit">Add Budget</Button>
    </Form>
  );
};

export default BudgetForm;