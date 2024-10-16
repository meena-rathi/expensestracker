import React, { useState, useEffect } from 'react';
import { axiosRes } from "../api/axiosDefaults";
import styles from '../styles/ExpensesList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import ExpensesForm from './ExpensesForm';
import { useHistory } from "react-router-dom";
import { Alert, Button, Table, Container, Row, Col } from 'react-bootstrap';
import TotalExpenses from './TotalExpenses'; // Import TotalExpenses component

const ExpensesDisplay = ({ budget, updateTotals = () => {} }) => {
  const [expenses, setLocalExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [message, setMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
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

  const confirmDelete = (id) => {
    setExpenseToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (expenseToDelete) {
      try {
        await axiosRes.delete(`/expenses/${expenseToDelete}/`);
        const response = await axiosRes.get(`/expenses/?page=${currentPage}&limit=${itemsPerPage}`);
        const { results } = response.data;
        setLocalExpenses(results);
        updateTotals();
        setMessage('Expense deleted successfully.');
        setTimeout(() => setMessage(''), 3000);
      } catch (err) {
        console.error('Failed to delete expense:', err);
        setMessage('Failed to delete expense.');
        setTimeout(() => setMessage(''), 3000);
      } finally {
        setShowDeleteConfirm(false);
        setExpenseToDelete(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setExpenseToDelete(null);
  };

  const handleEdit = (id) => {
    history.push(`/expenses/${id}/edit`);
  };

  const handleNewExpenseSubmit = (newExpense) => {
    const allExpenses = [...expenses, newExpense];
    allExpenses.sort((a, b) => a.id - b.id);

    const totalExpenses = allExpenses.length;
    const newTotalPages = Math.ceil(totalExpenses / itemsPerPage);

    if (currentPage === newTotalPages - 1 && expenses.length < itemsPerPage) {
      setLocalExpenses(allExpenses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    } else {
      setLocalExpenses(allExpenses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    }
    setTotalPages(newTotalPages);

    if (expenses.length === itemsPerPage && currentPage === newTotalPages - 1) {
      setCurrentPage(newTotalPages);
      setLocalExpenses(allExpenses.slice((newTotalPages - 1) * itemsPerPage, newTotalPages * itemsPerPage));
    }
    updateTotals();
  };

  return (
    <Container>
      {message && (
        <Alert variant={message.includes('successfully') ? 'success' : 'danger'}>
          {message}
        </Alert>
      )}

      {showDeleteConfirm && (
        <Alert variant="warning">
          <p>Are you sure you want to delete this expense?</p>
          <div className="d-flex justify-content-end">
            <Button variant="danger" onClick={handleDelete} className="me-2">Yes, Delete</Button>
            <Button variant="secondary" onClick={handleCancelDelete}>Cancel</Button>
          </div>
        </Alert>
      )}

      <ExpensesForm onSubmit={handleNewExpenseSubmit} />
      
      {expenses.length > 0 ? (
        <Table className={styles.expenses} responsive>
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
                  <Button variant="primary" onClick={() => handleEdit(expense.id)}>
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </Button>
                  <Button variant="danger" onClick={() => confirmDelete(expense.id)}>
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No expenses found.</p>
      )}
      
      {/* Total Expenses and Remaining Budget */}
      <Row>
        <Col xs={12}>
          <TotalExpenses budget={budget} expenses={expenses} />
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md="auto">
          <Button variant="secondary" onClick={prevPage} disabled={currentPage === 1}>
            <FontAwesomeIcon icon={faChevronLeft} /> Previous
          </Button>
        </Col>
        <Col md="auto">
          <span>Page {currentPage} of {totalPages}</span>
        </Col>
        <Col md="auto">
          <Button variant="secondary" onClick={nextPage} disabled={currentPage === totalPages}>
            Next <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ExpensesDisplay;











// import React, { useState, useEffect } from 'react';
// import { axiosRes } from "../api/axiosDefaults";
// import styles from '../styles/ExpensesList.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronLeft, faChevronRight, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
// import ExpensesForm from './ExpensesForm';
// import { useHistory } from "react-router-dom";
// import { Alert, Button, Table, Container, Row, Col } from 'react-bootstrap';
// import TotalExpenses from './TotalExpenses'; // Import TotalExpenses component

// const ExpensesDisplay = ({ budget, updateTotals = () => {} }) => {
//     const [expenses, setLocalExpenses] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [nextPageUrl, setNextPageUrl] = useState(null);
//     const [prevPageUrl, setPrevPageUrl] = useState(null);
//     const [message, setMessage] = useState('');
//     const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//     const [expenseToDelete, setExpenseToDelete] = useState(null);
//     const itemsPerPage = 10;
//     const history = useHistory();

//     useEffect(() => {
//         const fetchExpenses = async () => {
//             try {
//                 const url = `/expenses/?page=${currentPage}&limit=${itemsPerPage}`;
//                 const response = await axiosRes.get(url);
//                 const { count, next, previous, results } = response.data;

//                 console.log("Fetched expenses:", results); // Log fetched expenses

//                 setLocalExpenses(results); 
//                 setNextPageUrl(next);
//                 setPrevPageUrl(previous);
//                 setTotalPages(Math.ceil(count / itemsPerPage));
//                 updateTotals(); // Call to update totals whenever expenses are fetched
//             } catch (err) {
//                 console.error('Failed to fetch expenses:', err);
//                 setMessage('Failed to fetch expenses.');
//             }
//         };
//         fetchExpenses();
//     }, [currentPage, updateTotals]); // Fetch expenses when currentPage changes

//     // Handle new expense submission
//     const handleNewExpenseSubmit = async (newExpense) => {
//         try {
//             // Post the new expense to the server
//             const response = await axiosRes.post('/expenses/', newExpense);
//             const addedExpense = response.data; // Response contains the added expense
            
//             console.log("Added expense:", addedExpense); // Log added expense
            
//             // Fetch expenses again to ensure the local state is up to date
//             const url = `/expenses/?page=${currentPage}&limit=${itemsPerPage}`;
//             const updatedResponse = await axiosRes.get(url);
//             const { results } = updatedResponse.data;
            
//             console.log("Updated expenses after adding:", results); // Log updated expenses
            
//             // Set the local expenses to the newly fetched results
//             setLocalExpenses(results);
            
//             // Update totals
//             updateTotals();
            
//             // Reset current page to 1 to ensure we're on the first page after addition
//             setCurrentPage(1);
//         } catch (err) {
//             console.error('Failed to add expense:', err);
//             setMessage('Failed to add expense.');
//             setTimeout(() => setMessage(''), 3000);
//         }
//     };

//     const confirmDelete = (id) => {
//         setExpenseToDelete(id);
//         setShowDeleteConfirm(true);
//     };

//     const handleDelete = async () => {
//         if (expenseToDelete) {
//             try {
//                 await axiosRes.delete(`/expenses/${expenseToDelete}/`);

//                 // Reset current page to 1 to ensure we're on the first page after deletion
//                 setCurrentPage(1); // Reset to the first page to see the updated list
//                 setMessage('Expense deleted successfully.');
//                 setTimeout(() => setMessage(''), 3000);
//             } catch (err) {
//                 console.error('Failed to delete expense:', err);
//                 setMessage('Failed to delete expense.');
//                 setTimeout(() => setMessage(''), 3000);
//             } finally {
//                 setShowDeleteConfirm(false);
//                 setExpenseToDelete(null);
//             }
//         }
//     };

//     const nextPage = () => {
//         if (nextPageUrl) {
//             setCurrentPage(prevPage => prevPage + 1);
//         }
//     };

//     const prevPage = () => {
//         if (prevPageUrl) {
//             setCurrentPage(prevPage => prevPage - 1);
//         }
//     };

//     return (
//         <Container>
//             {message && (
//                 <Alert variant={message.includes('successfully') ? 'success' : 'danger'}>
//                     {message}
//                 </Alert>
//             )}

//             {showDeleteConfirm && (
//                 <Alert variant="warning">
//                     <p>Are you sure you want to delete this expense?</p>
//                     <div className="d-flex justify-content-end">
//                         <Button variant="danger" onClick={handleDelete} className="me-2">Yes, Delete</Button>
//                         <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
//                     </div>
//                 </Alert>
//             )}

//             <ExpensesForm onSubmit={handleNewExpenseSubmit} />
            
//             {expenses.length > 0 ? (
//                 <Table className={styles.expenses} responsive>
//                     <thead>
//                         <tr>
//                             <th>Amount</th>
//                             <th>Description</th>
//                             <th>Date</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {expenses.map((expense) => (
//                             <tr key={expense.id}>
//                                 <td>${expense.amount}</td>
//                                 <td>{expense.description}</td>
//                                 <td>{new Date(expense.date).toLocaleDateString()}</td>
//                                 <td>
//                                     <Button variant="primary" onClick={() => history.push(`/expenses/${expense.id}/edit`)}>
//                                         <FontAwesomeIcon icon={faEdit} /> Edit
//                                     </Button>
//                                     <Button variant="danger" onClick={() => confirmDelete(expense.id)}>
//                                         <FontAwesomeIcon icon={faTrash} /> Delete
//                                     </Button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             ) : (
//                 <p>No expenses found.</p>
//             )}
            
//             {/* Total Expenses and Remaining Budget */}
//             <Row>
//                 <Col xs={12}>
//                     <TotalExpenses budget={budget} expenses={expenses} />
//                 </Col>
//             </Row>

//             <Row className="justify-content-center">
//                 <Col md="auto">
//                     <Button variant="secondary" onClick={prevPage} disabled={currentPage === 1}>
//                         <FontAwesomeIcon icon={faChevronLeft} /> Previous
//                     </Button>
//                 </Col>
//                 <Col md="auto">
//                     <span>Page {currentPage} of {totalPages}</span>
//                 </Col>
//                 <Col md="auto">
//                     <Button variant="secondary" onClick={nextPage} disabled={currentPage === totalPages}>
//                         Next <FontAwesomeIcon icon={faChevronRight} />
//                     </Button>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default ExpensesDisplay;

