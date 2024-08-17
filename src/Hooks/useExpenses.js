import { useState, useEffect } from 'react';
import axios from 'axios';

const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('/api/expenses/');
        setExpenses(response.data);
      } catch (err) {
        setError('Error fetching expenses');
      }
    };
    fetchExpenses();
  }, []);

  const addExpense = async (expense) => {
    try {
      const response = await axios.post('/api/expenses/', expense);
      setExpenses([...expenses, response.data]);
    } catch (err) {
      setError('Error adding expense');
    }
  };

  return {
    expenses,
    addExpense,
    error,
  };
};

export default useExpenses;