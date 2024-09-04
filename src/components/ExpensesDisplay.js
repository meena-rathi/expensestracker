
// import React, { useState, useEffect } from 'react';
// import { axiosRes } from "../api/axiosDefaults";
// import styles from '../styles/ExpensesList.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronLeft, faChevronRight, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
// import { useHistory } from "react-router-dom";

// const ExpensesDisplay = ({ expense, updateTotals }) => {
//   const [expenses, setLocalExpenses] = useState([]);
  
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [nextPageUrl, setNextPageUrl] = useState(null);
//   const [prevPageUrl, setPrevPageUrl] = useState(null);
//   const [message, setMessage] = useState('');

//   const itemsPerPage = 10;
//   const history = useHistory();

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const url = `/expenses/?page=${currentPage}&limit=${itemsPerPage}`;
//         const response = await axiosRes.get(url);
//         const { count, next, previous, results } = response.data;

//         setLocalExpenses(results);
//         setNextPageUrl(next);
//         setPrevPageUrl(previous);
//         setTotalPages(Math.ceil(count / itemsPerPage));
//       } catch (err) {
//         console.error('Failed to fetch expenses:', err);
//         setMessage('Failed to fetch expenses.');
//       }
//     };

//     fetchExpenses();
//   }, [currentPage]);

//   const nextPage = () => {
//     if (nextPageUrl) {
//       setCurrentPage(prevPage => prevPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (prevPageUrl) {
//       setCurrentPage(prevPage => prevPage - 1);
//     }
//   };

//   const handleDelete = async (id) => {
//     const isConfirmed = window.confirm('Are you sure you want to delete this expense?');
//     if (isConfirmed) {
//       try {
//         await axiosRes.delete(`/expenses/${id}/`);
//         setLocalExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
//         updateTotals();
//         setMessage('Expense deleted successfully.');
//       } catch (err) {
//         console.error('Failed to delete expense:', err);
//         setMessage('Failed to delete expense.');
//       }
//     }
//   };

//   const handleEdit = (id) => {
//     history.push(`/expenses/${id}/edit`);
//   };

//   return (
//     <div>
//       <h2>Expenses List</h2>
//       {expenses.length > 0 ? (
//         <table className={styles.expenses}>
//           <thead>
//             <tr>
//               <th>Amount</th>
//               <th>Description</th>
//               <th>Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {expenses.map((expense) => (
//               <tr key={expense.id}>
//                 <td>${expense.amount}</td>
//                 <td>{expense.description}</td>
//                 <td>{new Date(expense.date).toLocaleDateString()}</td>
//                 <td>
//                   <button onClick={() => handleEdit(expense.id)}>
//                     <FontAwesomeIcon icon={faEdit} /> Edit
//                   </button>
//                   <button onClick={() => handleDelete(expense.id)}>
//                     <FontAwesomeIcon icon={faTrash} /> Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No expenses found.</p>
//       )}

//       <div className={styles.pagination}>
//         <button onClick={prevPage} disabled={currentPage === 1}>
//           <FontAwesomeIcon icon={faChevronLeft} /> Previous
//         </button>
//         <span>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button onClick={nextPage} disabled={currentPage === totalPages}>
//           Next <FontAwesomeIcon icon={faChevronRight} />
//         </button>
//       </div>
//       {message && <p className={styles.message}>{message}</p>}
//     </div>
//   );
// };

// export default ExpensesDisplay;

// import React, { useState, useEffect } from 'react';
// import { axiosRes } from "../api/axiosDefaults";
// import styles from '../styles/ExpensesList.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronLeft, faChevronRight, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
// import ExpensesForm from './ExpensesForm'; // Ensure this path is correct
// import { useHistory } from "react-router-dom";

// const ExpensesDisplay = ({ updateTotals = () => {} })=> {
//   const [expenses, setLocalExpenses] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [nextPageUrl, setNextPageUrl] = useState(null);
//   const [prevPageUrl, setPrevPageUrl] = useState(null);
//   const [message, setMessage] = useState('');

//   const itemsPerPage = 10;
//   const history = useHistory();

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const url = `/expenses/?page=${currentPage}&limit=${itemsPerPage}`;
//         const response = await axiosRes.get(url);
//         const { count, next, previous, results } = response.data;
//         setLocalExpenses(results);
//         setNextPageUrl(next);
//         setPrevPageUrl(previous);
//         setTotalPages(Math.ceil(count / itemsPerPage));
//       } catch (err) {
//         console.error('Failed to fetch expenses:', err);
//         setMessage('Failed to fetch expenses.');
//       }
//     };

//     fetchExpenses();
//   }, [currentPage]);

//   const nextPage = () => {
//     if (nextPageUrl) {
//       setCurrentPage(prevPage => prevPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (prevPageUrl) {
//       setCurrentPage(prevPage => prevPage - 1);
//     }
//   };
//   const handleDelete = async (id) => {
//     const isConfirmed = window.confirm('Are you sure you want to delete this expense?');
    
//     if (isConfirmed) {
//       try {
//         await axiosRes.delete(`/expenses/${id}/`);
        
//         // Refetch expenses data after successful deletion
//         const response = await axiosRes.get(`/expenses/?page=${currentPage}&limit=${itemsPerPage}`);
//         const { results } = response.data;
        
//         setLocalExpenses(results);
//         updateTotals();
//         setMessage('Expense deleted successfully.');
//       } catch (err) {
//         console.error('Failed to delete expense:', err);
//         setMessage('Failed to delete expense.');
//       }
//     }
//   };
//   const handleEdit = (id) => {
//     history.push(`/expenses/${id}/edit`);
//   };

//   return (
//     <div>
//       {message && <p className={styles.message}>{message}</p>}

//       {expenses.length > 0 ? (
//         <table className={styles.expenses}>
//           <thead>
//             <tr>
//               <th>Amount</th>
//               <th>Description</th>
//               <th>Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {expenses.map((expense) => (
//               <tr key={expense.id}>
//                 <td>${expense.amount}</td>
//                 <td>{expense.description}</td>
//                 <td>{new Date(expense.date).toLocaleDateString()}</td>
//                 <td>
//                   <button onClick={() => handleEdit(expense.id)}>
//                     <FontAwesomeIcon icon={faEdit} /> Edit
//                   </button>
//                   <button onClick={() => handleDelete(expense.id)}>
//                     <FontAwesomeIcon icon={faTrash} /> Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No expenses found.</p>
//       )}

//       <div className={styles.pagination}>
//         <button onClick={prevPage} disabled={currentPage === 1}>
//           <FontAwesomeIcon icon={faChevronLeft} /> Previous
//         </button>
//         <span>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button onClick={nextPage} disabled={currentPage === totalPages}>
//           Next <FontAwesomeIcon icon={faChevronRight} />
//         </button>
//       </div>
//       {message && <p className={styles.message}>{message}</p>}
//     </div>
//   );
// };

// export default ExpensesDisplay;
import React, { useState, useEffect } from 'react';
import { axiosRes } from "../api/axiosDefaults";
import styles from '../styles/ExpensesList.module.css' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import ExpensesForm from './ExpensesForm';
import { useHistory } from "react-router-dom";


const ExpensesDisplay = ({ updateTotals = () => {} }) => {
  const [expenses, setLocalExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [message, setMessage] = useState('');

  const itemsPerPage = 10;
  const history = useHistory();

  // Fetch expenses from the server
  const fetchExpenses = async () => {
    try {
      const url = `/expenses/?page=${currentPage}&limit=${itemsPerPage}`;
      const response = await axiosRes.get(url);
      const { count, next, previous, results } = response.data;
      
      // Sort by ID in descending order
      const sortedExpenses = results.sort((a, b) => b.id - a.id);

      setLocalExpenses(sortedExpenses);
      setNextPageUrl(next);
      setPrevPageUrl(previous);
      setTotalPages(Math.ceil(count / itemsPerPage));
    } catch (err) {
      console.error('Failed to fetch expenses:', err);
      setMessage('Failed to fetch expenses.');
      setAutoHideMessage();
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [currentPage]);

  const nextPage = () => {
    if (nextPageUrl) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (prevPageUrl) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this expense?');
    
    if (isConfirmed) {
      try {
        await axiosRes.delete(`/expenses/${id}/`);
        
        // Remove the deleted expense from the local state
        setLocalExpenses(expenses.filter(expense => expense.id !== id));
        updateTotals();
        setMessage('Expense deleted successfully.');
        setAutoHideMessage();
      } catch (err) {
        console.error('Failed to delete expense:', err);
        setMessage('Failed to delete expense.');
        setAutoHideMessage();
      }
    }
  };
 

  const handleEdit = (id) => {
    history.push(`/expenses/${id}/edit`);
  };

  const handleNewExpense = (newExpense) => {
    const updatedExpenses = [newExpense, ...expenses].sort((a, b) => b.id - a.id);
    setLocalExpenses(updatedExpenses);
    updateTotals();
    setMessage('Expense added successfully.');
    setAutoHideMessage();
  };

  // Function to auto-hide the message after 10 seconds
  const setAutoHideMessage = () => {
    setTimeout(() => {
      setMessage(''); // Clear the message after 10 seconds
    }, 10000); // 10000 milliseconds = 10 seconds
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 10000);
      return () => clearTimeout(timer); // Clear the timeout if the message changes
    }
  }, [message]);

  return (
    <div>
      {message && (
        <p className={styles.message}>{message}</p>
      )}

      {/* Add Expense Form */}
      <ExpensesForm onSubmit={handleNewExpense} />

      {expenses.length > 0 ? (
        <table className={styles.expenses}>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>${expense.amount}</td>
                <td>{expense.description}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleEdit(expense.id)}>
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>
                  <button onClick={() => handleDelete(expense.id)}>
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No expenses found.</p>
      )}

      <div className={styles.pagination}>
        <button onClick={prevPage} disabled={currentPage === 1}>
          <FontAwesomeIcon icon={faChevronLeft} /> Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default ExpensesDisplay;

