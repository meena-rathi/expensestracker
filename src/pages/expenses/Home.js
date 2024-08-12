import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/Home.module.css';  // Import your CSS file
import { useCurrentUser } from '../../contexts/CurrentUserContext'; // Custom hook for user context
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Home = () => {
  const user = useCurrentUser();  // Get current user from context
  const [budget, setBudget] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await axios.get('/api/budget/');
        console.log('Budget Response:', response.data);  // Debugging line
        if (response.data.length > 0) {
          setBudget(response.data[0].amount);  // Assuming there's one budget per user
        }
      } catch (err) {
        console.error('Failed to load budget data:', err);  // Debugging line
        setError('Failed to load budget data');
      }
    };
    fetchBudget();
  }, []);

  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };

  const handleBudgetSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/budgets/', { amount: budget });
      alert('Budget updated successfully');
    } catch (err) {
      console.error('Failed to update budget:', err);  // Debugging line
      setError('Failed to update budget');
    }
  };

  console.log('User:', user);  // Debugging line
  return (
    <div className={styles.homeContainer}>
      {user && (
        <div className={styles.userInfo}>
          <h1>Welcome, {user.username}!</h1>
        </div>
      )}
      <div className={styles.budgetFormContainer}>
        <Form onSubmit={handleBudgetSubmit}>
          <Form.Group controlId="budget">
            <Form.Label>Set Monthly Budget Amount</Form.Label>
            <Form.Control
              type="number"
              value={budget}
              onChange={handleBudgetChange}
              placeholder="Enter your budget"
            />
          </Form.Group>
          <Button variant="primary" type="submit">Update Budget</Button>
        </Form>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

export default Home;