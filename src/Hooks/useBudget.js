import { useState, useEffect } from 'react';
import axios from 'axios';

const useBudget = () => {
  const [budget, setBudget] = useState(null);
  const [error, setError] = useState(null);
  const [isBudgetLoaded, setIsBudgetLoaded] = useState(false);
  const [budgetId, setBudgetId] = useState(null);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await axios.get("/expenses/budgets/");
        console.log('API Response:', response.data);
        if (response.data.results && response.data.results.length > 0) {
          setBudget(parseFloat(response.data.results[0].amount));
          setBudgetId(response.data.results[0].id);
        } else {
          setBudget(0.00);
        }
        setIsBudgetLoaded(true);
      } catch (err) {
        console.error('Failed to load budget data:', err.response ? err.response.data : err.message);
        setError('Failed to load budget data');
        setIsBudgetLoaded(true);
      }
    };
    fetchBudget();
  }, []);

  const handleBudgetSubmit = async (newBudget) => {
    try {
      const updatedBudget = parseFloat(budget) + parseFloat(newBudget);
      if (budgetId) {
        await axios.put(`/expenses/budgets/${budgetId}/`, { amount: updatedBudget });
      } else {
        await axios.post('/expenses/budgets/', { amount: updatedBudget });
      }
      setBudget(updatedBudget.toFixed(2));
      setError(null);
    } catch (err) {
      console.error('Failed to update budget:', err.response ? err.response.data : err.message);
      setError('Failed to update budget');
    }
  };
  return {
    budget,
    error,
    isBudgetLoaded,
    handleBudgetSubmit,
  };
};

export default useBudget;