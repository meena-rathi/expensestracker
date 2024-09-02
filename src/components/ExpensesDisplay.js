
import React, { useState, useEffect } from 'react';
import { axiosRes } from "../api/axiosDefaults";
import styles from '../styles/ExpensesList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";

const ExpensesDisplay = ({ setExpenses, updateTotals }) => {
  const [expenses, setLocalExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [message, setMessage] = useState('');

  const itemsPerPage = 10;
  const history = useHistory();

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
        setLocalExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
        updateTotals();
        setMessage('Expense deleted successfully.');
      } catch (err) {
        console.error('Failed to delete expense:', err);
        setMessage('Failed to delete expense.');
      }
    }
  };

  const handleEdit = (id) => {
    history.push(`/expenses/${id}/edit`);
  };

  return (
    <div>
      <h2>Expenses List</h2>
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
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default ExpensesDisplay;

// import React, { useState } from 'react';
// import styles from '../styles/ExpensesList.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
// const ExpensesDisplay = ({ expenses }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerpage = 10;

//   const indexOfLastItem = currentPage * itemsPerpage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerpage;
//   const currentExpenses = expenses.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(expenses.length/itemsPerpage) 
//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };
//    return (
//     <div>
//       <h2>Expenses List</h2>
//       {expenses.length > 0 ? (
//         <table className={styles.expenses}>
//           {currentExpenses.map((expense) => (
//             <tr key={expense.id}>
//               <td> ${expense.amount}</td>
//               <td>{expense.description}</td>
//               <td>{new Date(expense.date).toLocaleDateString()}</td>
//               {/* <t/> */}
//             </tr>
//           ))}
//         </table>
//       ) : (
//         <p>No expenses found.</p>
//       )}
//        <div className={styles.pagination}>
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


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from '../styles/ExpensesList.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// const ExpensesDisplay = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1); // Keep track of total pages
//   const [nextPageUrl, setNextPageUrl] = useState(null); // URL for the next page
//   const [prevPageUrl, setPrevPageUrl] = useState(null); // URL for the previous page

//   const itemsPerPage = 10; // Define items per page

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const url = `/expenses/?page=${currentPage}&limit=${itemsPerPage}`;
//         const response = await axios.get(url);
//         const { count, next, previous, results } = response.data;

//         setExpenses(results);
//         setNextPageUrl(next);
//         setPrevPageUrl(previous);
//         setTotalPages(Math.ceil(count / itemsPerPage));
//       } catch (err) {
//         console.error('Failed to fetch expenses:', err);
//       }
//     };

//     fetchExpenses();
//   }, [currentPage]);

//   const nextPage = () => {
//     if (nextPageUrl) {
//       setCurrentPage((prevPage) => prevPage + 1); // Increment the page number
//     }
//   };

//   const prevPage = () => {
//     if (prevPageUrl) {
//       setCurrentPage((prevPage) => prevPage - 1); // Decrement the page number
//     }
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
//             </tr>
//           </thead>
//           <tbody>
//             {expenses.map((expense) => (
//               <tr key={expense.id}>
//                 <td>${parseFloat(expense.amount).toFixed(2)}</td>
//                 <td>{expense.description}</td>
//                 <td>{new Date(expense.date).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No expenses found.</p>
//       )}
//       <div className={styles.pagination}>
//         <button onClick={prevPage} disabled={!prevPageUrl}>
//           <FontAwesomeIcon icon={faChevronLeft} /> Previous
//         </button>
//         <span>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button onClick={nextPage} disabled={!nextPageUrl}>
//           Next <FontAwesomeIcon icon={faChevronRight} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ExpensesDisplay;



///ksfkdfkhf
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from '../styles/ExpensesList.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronLeft, faChevronRight, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

// const ExpensesDisplay = ({ expenses, setExpenses, updateTotals }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1); // Keep track of total pages
//   const [nextPageUrl, setNextPageUrl] = useState(null); // URL for the next page
//   const [prevPageUrl, setPrevPageUrl] = useState(null); // URL for the previous page
//   const [editingExpense, setEditingExpense] = useState(null); // State to handle editing
  
//   const itemsPerPage = 10; // Define items per page

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const url = `/expenses/?page=${currentPage}&limit=${itemsPerPage}`;
//         const response = await axios.get(url);
//         const { count, next, previous, results } = response.data;

//         setExpenses(results);
//         setNextPageUrl(next);
//         setPrevPageUrl(previous);
//         setTotalPages(Math.ceil(count / itemsPerPage));
//       } catch (err) {
//         console.error('Failed to fetch expenses:', err);
//       }
//     };

//     fetchExpenses();
//   }, [currentPage, setExpenses]);

//   const nextPage = () => {
//     if (nextPageUrl) {
//       setCurrentPage((prevPage) => prevPage + 1); // Increment the page number
//     }
//   };

//   const prevPage = () => {
//     if (prevPageUrl) {
//       setCurrentPage((prevPage) => prevPage - 1); // Decrement the page number
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/expenses/${id}/`);
//       setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
//       updateTotals(); // Recalculate totals after deletion
//     } catch (error) {
//       console.error('Failed to delete expense:', error);
//     }
//   };

//   const handleEdit = (expense) => {
//     setEditingExpense(expense);
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`/expenses/${editingExpense.id}/`, editingExpense);
//       setExpenses(prevExpenses => prevExpenses.map(expense =>
//         expense.id === editingExpense.id ? editingExpense : expense
//       ));
//       setEditingExpense(null);
//       updateTotals(); // Recalculate totals after editing
//     } catch (error) {
//       console.error('Failed to edit expense:', error);
//     }
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditingExpense(prev => ({ ...prev, [name]: value }));
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
//                 {editingExpense && editingExpense.id === expense.id ? (
//                   <>
//                     <td>
//                       <input
//                         type="number"
//                         name="amount"
//                         value={editingExpense.amount}
//                         onChange={handleEditChange}
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="text"
//                         name="description"
//                         value={editingExpense.description}
//                         onChange={handleEditChange}
//                       />
//                     </td>
//                     <td>{new Date(expense.date).toLocaleDateString()}</td>
//                     <td>
//                       <button onClick={handleEditSubmit}>Save</button>
//                       <button onClick={() => setEditingExpense(null)}>Cancel</button>
//                     </td>
//                   </>
//                 ) : (
//                   <>
//                     <td>${parseFloat(expense.amount).toFixed(2)}</td>
//                     <td>{expense.description}</td>
//                     <td>{new Date(expense.date).toLocaleDateString()}</td>
//                     <td>
//                       <button onClick={() => handleEdit(expense)}>
//                         <FontAwesomeIcon icon={faEdit} /> Edit
//                       </button>
//                       <button onClick={() => handleDelete(expense.id)}>
//                         <FontAwesomeIcon icon={faTrash} /> Delete
//                       </button>
//                     </td>
//                   </>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No expenses found.</p>
//       )}
//       <div className={styles.pagination}>
//         <button onClick={prevPage} disabled={!prevPageUrl}>
//           <FontAwesomeIcon icon={faChevronLeft} /> Previous
//         </button>
//         <span>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button onClick={nextPage} disabled={!nextPageUrl}>
//           Next <FontAwesomeIcon icon={faChevronRight} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ExpensesDisplay;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from '../styles/ExpensesList.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronLeft, faChevronRight, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

// const ExpensesDisplay = ({expenses, setExpenses, updateTotals  }) => {
//   // const [expenses, setExpenses] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [nextPageUrl, setNextPageUrl] = useState(null);
//   const [prevPageUrl, setPrevPageUrl] = useState(null);
//   const [editingExpense, setEditingExpense] = useState(null);

//   const itemsPerPage = 10;

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const url = `/expenses/?page=${currentPage}&limit=${itemsPerPage}`;
//         const response = await axios.get(url);
//         const { count, next, previous, results } = response.data;

//         setExpenses(results);
//         setNextPageUrl(next);
//         setPrevPageUrl(previous);
//         setTotalPages(Math.ceil(count / itemsPerPage));
//       } catch (err) {
//         console.error('Failed to fetch expenses:', err);
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
//     try {
//       await axios.delete(`/expenses/${id}/`);
//       setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
//       updateTotals(); // Recalculate totals after deletion
//     } catch (error) {
//       console.error('Failed to delete expense:', error);
//     }
//   };

//   const handleEdit = (expense) => {
//     setEditingExpense(expense);
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditingExpense(prev => ({ ...prev, [name]: value }));
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`/expenses/${editingExpense.id}/`, editingExpense);
//       setExpenses(prevExpenses => prevExpenses.map(expense =>
//         expense.id === editingExpense.id ? editingExpense : expense
//       ));
//       setEditingExpense(null);
//       updateTotals(); // Recalculate totals after editing
//     } catch (error) {
//       console.error('Failed to edit expense:', error);
//     }
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
//                 {editingExpense && editingExpense.id === expense.id ? (
//                   <>
//                     <td>
//                       <input
//                         type="number"
//                         name="amount"
//                         value={editingExpense.amount}
//                         onChange={handleEditChange}
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="text"
//                         name="description"
//                         value={editingExpense.description}
//                         onChange={handleEditChange}
//                       />
//                     </td>
//                     <td>{new Date(expense.date).toLocaleDateString()}</td>
//                     <td>
//                       <button onClick={handleEditSubmit}>Save</button>
//                       <button onClick={() => setEditingExpense(null)}>Cancel</button>
//                     </td>
//                   </>
//                 ) : (
//                   <>
//                     <td>${parseFloat(expense.amount).toFixed(2)}</td>
//                     <td>{expense.description}</td>
//                     <td>{new Date(expense.date).toLocaleDateString()}</td>
//                     <td>
//                       <button onClick={() => handleEdit(expense)}>
//                         <FontAwesomeIcon icon={faEdit} /> Edit
//                       </button>
//                       <button onClick={() => handleDelete(expense.id)}>
//                         <FontAwesomeIcon icon={faTrash} /> Delete
//                       </button>
//                     </td>
//                   </>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No expenses found.</p>
//       )}
//       <div className={styles.pagination}>
//         <button onClick={prevPage} disabled={!prevPageUrl}>
//           <FontAwesomeIcon icon={faChevronLeft} /> Previous
//         </button>
//         <span>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button onClick={nextPage} disabled={!nextPageUrl}>
//           Next <FontAwesomeIcon icon={faChevronRight} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ExpensesDisplay;

// import React, { useState, useEffect } from 'react';
// import { axiosRes } from "../api/axiosDefaults";
// import styles from '../styles/ExpensesList.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronLeft, faChevronRight, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
// import { useHistory } from "react-router-dom";

// const ExpensesDisplay = ({ expenses, setExpenses, updateTotals}) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [nextPageUrl, setNextPageUrl] = useState(null);
//   const [prevPageUrl, setPrevPageUrl] = useState(null);
//   const [editingExpense, setEditingExpense] = useState(null);
//   const [message, setMessage] = useState('');

//   const itemsPerPage = 10;
//   const history = useHistory();

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const url = `/expenses/?page=${currentPage}&limit=${itemsPerPage}`;
//         const response = await axiosRes.get(url);
//         const { count, next, previous, results } = response.data;

//         setExpenses(results);
//         setNextPageUrl(next);
//         setPrevPageUrl(previous);
//         setTotalPages(Math.ceil(count / itemsPerPage));
//       } catch (err) {
//         console.error('Failed to fetch expenses:', err);
//         setMessage('Failed to fetch expenses.');
//       }
//     };

//     fetchExpenses();
//   }, [currentPage, setExpenses]);

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

//         // Update the expenses state without reloading the page
//         setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));

//         // Optionally, update other components or calculations
//         updateTotals();

//         // Set success message
//         setMessage('Expense deleted successfully.');
//       } catch (err) {
//         console.error('Failed to delete expense:', err);

//         // Set failure message
//         setMessage('Failed to delete expense.');
//       }
//     }
//   };
//   // const handleEdit = (id) => {
//   //   history.push(`/expenses/${id}/edit`);
//   // };
 
//   const handleEdit = (id) => {
//     history.push(`/expenses/${id}/edit`);
//   };
//   //};
//   return (
//         <div>
//           <h2>Expenses List</h2>
//           {expenses.length > 0 ? (
//             <table className={styles.expenses}>
//                <tr>
//                 <th>Amount</th>
//                 <th>Description</th>
//                 <th>Date</th>
//                 <th>Actions</th>
//                 </tr>
//               {expenses.map((expense) => (
//                 <tr key={expense.id}>
//                   <td> ${expense.amount}</td>
//                   <td>{expense.description}</td>
//                   <td>{new Date(expense.date).toLocaleDateString()}</td>
//                   {/* <t/> */}
//                   <td>
//                     {/* <button onClick={() => handleEdit(expense)}>
//                       <FontAwesomeIcon icon={faEdit} /> Edit
//                       </button> */}
//                       <button onClick={() => handleEdit(expense.id)}>
//                         <FontAwesomeIcon icon={faEdit} /> Edit
//                       </button>
//                       <button onClick={() => handleDelete(expense.id)}>
//                         <FontAwesomeIcon icon={faTrash} /> Delete
//                       </button>
//                      {/* <button onClick={handleEdit}>Edit</button>
//                     <button onClick={handleDelete}>Delete</button>  */}
//                     </td>
//                 </tr>
//               ))}
//             </table>
//           ) : (
//             <p>No expenses found.</p>
//           )}
//            <div className={styles.pagination}>
//             <button onClick={prevPage} disabled={currentPage === 1}>
//               <FontAwesomeIcon icon={faChevronLeft} /> Previous
//             </button>
//             <span>
//               Page {currentPage} of {totalPages}
//             </span>
//             <button onClick={nextPage} disabled={currentPage === totalPages}>
//               Next <FontAwesomeIcon icon={faChevronRight} />
//             </button>
//           </div>
//         </div>
//       );
//     };




//   return (
//     <div>
//       <h2>Expenses List</h2>
//       {message && <p>{message}</p>}
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
//                 {editingExpense && editingExpense.id === expense.id ? (
//                   <>
//                     <td>
//                       <input
//                         type="number"
//                         name="amount"
//                         value={editingExpense.amount}
//                         onChange={handleEditChange}
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="text"
//                         name="description"
//                         value={editingExpense.description}
//                         onChange={handleEditChange}
//                       />
//                     </td>
//                     <td>{new Date(expense.date).toLocaleDateString()}</td>
//                     <td>
//                       <button onClick={handleEditSubmit}>Save</button>
//                       <button onClick={() => setEditingExpense(null)}>Cancel</button>
//                     </td>
//                   </>
//                 ) : (
//                   <>
//                     <td>${parseFloat(expense.amount).toFixed(2)}</td>
//                     <td>{expense.description}</td>
//                     <td>{new Date(expense.date).toLocaleDateString()}</td>
//                     <td>
//                       <button onClick={() => handleEdit(expense)}>
//                         <FontAwesomeIcon icon={faEdit} /> Edit
//                       </button>
//                       <button onClick={() => handleDelete(expense.id)}>
//                         <FontAwesomeIcon icon={faTrash} /> Delete
//                       </button>
//                     </td>
//                   </>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No expenses found.</p>
//       )}
//       <div className={styles.pagination}>
//         <button onClick={prevPage} disabled={!prevPageUrl}>
//           <FontAwesomeIcon icon={faChevronLeft} /> Previous
//         </button>
//         <span>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button onClick={nextPage} disabled={!nextPageUrl}>
//           Next <FontAwesomeIcon icon={faChevronRight} />
//         </button>
//       </div>
//     </div>
//   );
// };

//export default ExpensesDisplay;