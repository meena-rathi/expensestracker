import React, { useState } from 'react';
import styles from '../styles/ExpensesList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
const ExpensesDisplay = ({ expenses }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerpage = 10;

  const indexOfLastItem = currentPage * itemsPerpage;
  const indexOfFirstItem = indexOfLastItem - itemsPerpage;
  const currentExpenses = expenses.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(expenses.length/itemsPerpage) 
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
   return (
    <div>
      <h2>Expenses List</h2>
      {expenses.length > 0 ? (
        <table className={styles.expenses}>
          {currentExpenses.map((expense) => (
            <tr key={expense.id}>
              <td> ${expense.amount}</td>
              <td>{expense.description}</td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              {/* <t/> */}
            </tr>
          ))}
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