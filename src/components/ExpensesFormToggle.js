import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/BudgetFormToggle.module.css'; // Your custom CSS if needed

const ExpensesFormToggle = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const expenseData = { amount, description };
    onSubmit(expenseData);
    setAmount('');
    setDescription('');
    setIsFormVisible(false);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="mb-5"> {/* Added bottom margin to the whole container */}
      {/* Toggle button to show/hide the form */}
      <div className="text-center mb-4"> {/* Added margin-bottom between button and form */}
        <Button variant="info" onClick={toggleFormVisibility} className="btn-lg">
          {isFormVisible ? (
            <>
              <FontAwesomeIcon icon={faMinus} /> Hide Expense Form
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faPlus} /> Set Expense
            </>
          )}
        </Button>
      </div>

      {/* Form section with better Bootstrap styling */}
      {isFormVisible && (
        <div className={`p-4 border rounded bg-light shadow-lg ${styles.formContainer} mt-4`}> {/* Added larger top margin to the form */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="amount" className="mb-4"> {/* Added margin-bottom for spacing */}
              <Form.Label>Expense Amount</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
                className="form-control-lg"
                required
              />
            </Form.Group>
            <Form.Group controlId="description" className="mb-4"> {/* Added margin-bottom for spacing */}
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Enter description"
                className="form-control-lg"
                required
              />
            </Form.Group>
            <div className="text-center">
              <Button variant="success" type="submit" className="btn-lg w-100"> {/* Green submit button */}
                Add Expense
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default ExpensesFormToggle;
