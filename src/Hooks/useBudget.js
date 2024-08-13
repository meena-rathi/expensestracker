// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const useBudget = () => {
//   const [budget, setBudget] = useState('');
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [isBudgetLoaded, setIsBudgetLoaded] = useState(false);

//   // Fetch budget when component mounts
//   useEffect(() => {
//     const fetchBudget = async () => {
//       try {
//         const response = await axios.get("/budgets/");
//         if (response.data && response.data.length > 0) {
//           setBudget(response.data[0].amount);
//         }
//         setIsBudgetLoaded(true);
//       } catch (err) {
//         console.error('Failed to load budget data:', err.response ? err.response.data : err.message);
//         setError('Failed to load budget data');
//         setIsBudgetLoaded(true);
//       }
//     };
//     fetchBudget();
//   }, []);

//   // Handle budget submission
//   const handleBudgetSubmit = async (newBudget) => {
//     try {
//       await axios.post("/budgets/", { amount: newBudget });
//       setBudget(newBudget);
//       setSuccess('Budget updated successfully');
//       setError(null);
//     } catch (err) {
//       setError('Failed to update budget');
//       setSuccess(null);
//     }
//   };

//   return {
//     budget,
//     error,
//     success,
//     isBudgetLoaded,
//     handleBudgetSubmit,
//     setBudget,
//   };
// };

// export default useBudget;

import { useState, useEffect } from 'react';
import axios from 'axios';

const useBudget = () => {
  const [budget, setBudget] = useState(null); // Use null to indicate loading state
  const [error, setError] = useState(null);
  const [isBudgetLoaded, setIsBudgetLoaded] = useState(false);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await axios.get("/budgets/");
        console.log('API Response:', response.data);

        // Access the results array and get the first budget
        if (response.data.results && response.data.results.length > 0) {
          setBudget(response.data.results[0].amount); // Set budget amount from the first entry
        } else {
          setBudget('0.00'); // Default to 0 if no data found
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
      await axios.post("/budgets/", { amount: newBudget });
      setBudget(newBudget);
      setError(null);
    } catch (err) {
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