import React, { useState, useEffect } from 'react';
import { axiosRes } from "../api/axiosDefaults";
import styles from '../styles/ExpensesList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import ExpensesForm from './ExpensesForm';
import { useHistory } from "react-router-dom";
import { Alert, Button, Table, Container, Row, Col } from 'react-bootstrap';

const ExpensesDisplay = ({ updateTotals = () => {} }) => {
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
      }
    }
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
                  <Button variant="danger" onClick={() => handleDelete(expense.id)}>
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