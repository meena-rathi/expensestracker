import { useState, useEffect } from 'react';
import axios from 'axios';

const useBudget = () => {
  const [budget, setBudget] = useState(null); // Initial budget state
  const [error, setError] = useState(null); // Error state
  const [isBudgetLoaded, setIsBudgetLoaded] = useState(false); // Budget loading state
  const [budgetId, setBudgetId] = useState(null); // State to store the budget ID

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        // Fetch budget data from the API
        const response = await axios.get("/budgets/");
        console.log('API Response:', response.data);

        if (response.data.results && response.data.results.length > 0) {
          setBudget(parseFloat(response.data.results[0].amount)); // Ensure budget is stored as a number
          setBudgetId(response.data.results[0].id); // Set the budget ID
        } else {
          setBudget(0.00); // Default to 0.00 if no data is found
        }
        setIsBudgetLoaded(true); // Set loading state to true after fetching
      } catch (err) {
        console.error('Failed to load budget data:', err.response ? err.response.data : err.message);
        setError('Failed to load budget data');
        setIsBudgetLoaded(true);
      }
    };

    fetchBudget();
  }, []);

  // const handleBudgetSubmit = async (newBudget) => {
  //   try {
  //     const updatedBudget = parseFloat(budget) + parseFloat(newBudget); // Calculate the updated budget
  //     await axios.put(`/budgets/${budgetId}/`, { amount: updatedBudget }); // Update the budget on the server

  //     setBudget(updatedBudget.toFixed(2)); // Update the budget in the state
  //     setError(null); // Clear any previous errors
  //   } catch (err) {
  //     console.error('Failed to update budget:', err.response ? err.response.data : err.message);
  //     setError('Failed to update budget'); // Set an error message if the update fails
  //   }
  // };

  const handleBudgetSubmit = async (newBudget) => {
    try {
      const updatedBudget = parseFloat(budget) + parseFloat(newBudget);
      if (budgetId) { // Make sure the budgetId is defined
        await axios.put(`/budgets/${budgetId}/`, { amount: updatedBudget });
      } else {
        await axios.post('/budgets/', { amount: updatedBudget });
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