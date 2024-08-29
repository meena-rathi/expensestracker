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


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/ExpensesList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ExpensesDisplay = () => {
  const [expenses, setExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Keep track of total pages
  const [nextPageUrl, setNextPageUrl] = useState(null); // URL for the next page
  const [prevPageUrl, setPrevPageUrl] = useState(null); // URL for the previous page

  const itemsPerPage = 10; // Define items per page

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const url = `/expenses/?page=${currentPage}&limit=${itemsPerPage}`;
        const response = await axios.get(url);
        const { count, next, previous, results } = response.data;

        setExpenses(results);
        setNextPageUrl(next);
        setPrevPageUrl(previous);
        setTotalPages(Math.ceil(count / itemsPerPage));
      } catch (err) {
        console.error('Failed to fetch expenses:', err);
      }
    };

    fetchExpenses();
  }, [currentPage]);

  const nextPage = () => {
    if (nextPageUrl) {
      setCurrentPage((prevPage) => prevPage + 1); // Increment the page number
    }
  };

  const prevPage = () => {
    if (prevPageUrl) {
      setCurrentPage((prevPage) => prevPage - 1); // Decrement the page number
    }
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
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>${parseFloat(expense.amount).toFixed(2)}</td>
                <td>{expense.description}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No expenses found.</p>
      )}
      <div className={styles.pagination}>
        <button onClick={prevPage} disabled={!prevPageUrl}>
          <FontAwesomeIcon icon={faChevronLeft} /> Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={!nextPageUrl}>
          Next <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default ExpensesDisplay;