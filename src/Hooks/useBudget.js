

// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const useBudget = () => {
//   const [budget, setBudget] = useState(null); // Use null to indicate loading state
//   const [error, setError] = useState(null);
//   const [isBudgetLoaded, setIsBudgetLoaded] = useState(false);

//   useEffect(() => {
//     const fetchBudget = async () => {
//       try {
//         const response = await axios.get("/budgets/");
//         console.log('API Response:', response.data);

//         // Access the results array and get the first budget
//         if (response.data.results && response.data.results.length > 0) {
//           setBudget(response.data.results[0].amount); // Set budget amount from the first entry
//         } else {
//           setBudget('0.00'); // Default to 0 if no data found
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

//   const handleBudgetSubmit = async (newBudget) => {
//     try {
//       await axios.post("/budgets/", { amount: newBudget });
//       const numericBudget = parseFloat(newBudget);
//       if (!isNaN(numericBudget) && numericBudget > 0) {
//         setBudget((prevBudget) => prevBudget + numericBudget); // Accumulate the budget
//       } else {
//         setError('Please enter a valid positive number.');
//       }
//     } catch (err) {
//       setError('Error updating budget');
//     //   setBudget(newBudget);
//     //   setError(null);
//     // } catch (err) {
//     //   setError('Failed to update budget');
//     }
//   };

//   return {
//     budget,
//     error,
//     isBudgetLoaded,
//     handleBudgetSubmit,
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
      const updatedBudget = parseFloat(budget) + parseFloat(newBudget);
      await axios.post("/budgets/", { amount: updatedBudget });
      setBudget(updatedBudget.toFixed(2)); // Update and format the budget
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