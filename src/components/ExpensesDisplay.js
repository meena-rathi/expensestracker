

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

 

// import React, { useState, useEffect } from 'react';
// import { axiosRes } from "../api/axiosDefaults";
// import styles from '../styles/ExpensesList.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronLeft, faChevronRight, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
// import ExpensesForm from './ExpensesForm';
// import { useHistory } from "react-router-dom";
// import { Alert } from 'react-bootstrap'; // For success message

// const ExpensesDisplay = ({ updateTotals = () => {} }) => {
//   const [expenses, setLocalExpenses] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [nextPageUrl, setNextPageUrl] = useState(null);
//   const [prevPageUrl, setPrevPageUrl] = useState(null);
//   const [message, setMessage] = useState('');

//   const itemsPerPage = 10;
//   const history = useHistory();

//   // Fetch expenses from the server
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
//         const response = await axiosRes.get(`/expenses/?page=${currentPage}&limit=${itemsPerPage}`);
//         const { results } = response.data;
//         setLocalExpenses(results);
//         updateTotals();
//         setMessage('Expense deleted successfully.');
//         setTimeout(() => setMessage(''), 3000); // Auto-hide the success message
//       } catch (err) {
//         console.error('Failed to delete expense:', err);
//         setMessage('Failed to delete expense.');
//         setTimeout(() => setMessage(''), 3000); // Auto-hide the error message
//       }
//     }
//   };

//   const handleEdit = (id) => {
//     history.push(`/expenses/${id}/edit`);
//   };

//   return (
//     <div>
//       {/* Only show the success/error message once */}
//       {message && (
//         <Alert variant={message.includes('successfully') ? 'success' : 'danger'}>
//           {message}
//         </Alert>
//       )}

//       {/* Add Expense Form */}
//       <ExpensesForm onSubmit={(newExpense) => {
//         const updatedExpenses = [newExpense, ...expenses];
//         setLocalExpenses(updatedExpenses);
//         updateTotals();
//         setMessage('Expense added successfully.');
//         setTimeout(() => setMessage(''), 3000); // Auto-hide success message
//       }} />

//       {/* Expense List Table */}
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

//       {/* Pagination */}
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
//     </div>
//   );
// };

// export default ExpensesDisplay;
import React, { useState, useEffect } from 'react';
import { axiosRes } from "../api/axiosDefaults";
import styles from '../styles/ExpensesList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import ExpensesForm from './ExpensesForm';
import { useHistory } from "react-router-dom";
import { Alert } from 'react-bootstrap'; // For success message

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
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const url = `/expenses/?page=${currentPage}&limit=${itemsPerPage}`;
        const response = await axiosRes.get(url);
        const { count, next, previous, results } = response.data;
        setLocalExpenses(results);
        setNextPageUrl(next);
        setPrevPageUrl(previous);
        setTotalPages(Math.ceil(count / itemsPerPage));
      } catch (err) {
        console.error('Failed to fetch expenses:', err);
        setMessage('Failed to fetch expenses.');
      }
    };
    fetchExpenses();
  }, [currentPage]);

  // Go to the next page
  const nextPage = () => {
    if (nextPageUrl) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  // Go to the previous page
  const prevPage = () => {
    if (prevPageUrl) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  // Handle delete expense
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this expense?');
    if (isConfirmed) {
      try {
        await axiosRes.delete(`/expenses/${id}/`);
        const response = await axiosRes.get(`/expenses/?page=${currentPage}&limit=${itemsPerPage}`);
        const { results } = response.data;
        setLocalExpenses(results);
        updateTotals();
        setMessage('Expense deleted successfully.');
        setTimeout(() => setMessage(''), 3000); // Auto-hide the success message
      } catch (err) {
        console.error('Failed to delete expense:', err);
        setMessage('Failed to delete expense.');
        setTimeout(() => setMessage(''), 3000); // Auto-hide the error message
      }
    }
  };

  // Handle edit expense
  const handleEdit = (id) => {
    history.push(`/expenses/${id}/edit`);
  };

  // Handle new expense submission
  const handleNewExpenseSubmit = (newExpense) => {
    const allExpenses = [...expenses, newExpense];
    // Sort by ID (or timestamp, if available)
    allExpenses.sort((a, b) => a.id - b.id);

    const totalExpenses = allExpenses.length;
    const newTotalPages = Math.ceil(totalExpenses / itemsPerPage);

    // If new expense exceeds current page's limit, don't add to the current page's display
    if (currentPage === newTotalPages - 1 && expenses.length < itemsPerPage) {
      setLocalExpenses(allExpenses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    } else {
      setLocalExpenses(allExpenses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    }

    // Update total pages after adding a new expense
    setTotalPages(newTotalPages);

    // If new expense is beyond the current page, show next page
    if (expenses.length === itemsPerPage && currentPage === newTotalPages - 1) {
      setCurrentPage(newTotalPages);
      setLocalExpenses(allExpenses.slice((newTotalPages - 1) * itemsPerPage, newTotalPages * itemsPerPage));
    }

    // Display success message
    updateTotals();
   // setMessage('Expense added successfully.');
    //setTimeout(() => setMessage(''), 3000); // Auto-hide success message
  };

  return (
    <div>
      {/* Only show the success/error message once */}
      {message && (
        <Alert variant={message.includes('successfully') ? 'success' : 'danger'}>
          {message}
        </Alert>
      )}

      {/* Add Expense Form */}
      <ExpensesForm onSubmit={handleNewExpenseSubmit} />

      {/* Expense List Table */}
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

      {/* Pagination */}
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