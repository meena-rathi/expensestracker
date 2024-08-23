import { useState, useEffect } from 'react';
// import { axios } from '../api/axiosDefaults';  
import axios from 'axios';

const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('/expenses/');
        setExpenses(response.data.results);
      } catch (err) {
        setError('Error fetching expenses');
        console.error('Fetch expenses error:', err.response ? err.response.data : err.message);
      }
    };

    fetchExpenses();
  }, []);

  
  const addExpense = async (newExpenses) => {
    try {
      const response = await axios.post('/expenses/', newExpenses);
      setExpenses((prevExpenses) => [...prevExpenses, response.data]);
      setError(null);
    } catch (err) {
      setError('Failed to add expenses');
    }
  };
  return {
    expenses,
    addExpense,
    error,
  };
};

export default useExpenses;
