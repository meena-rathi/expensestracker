import React, { useState, useEffect, useRef } from 'react';
import { axiosRes } from "../api/axiosDefaults";
import styles from '../styles/ExpensesList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import ExpensesForm from './ExpensesForm';
import { useHistory } from "react-router-dom";
import { Alert, Button, Table, Container, Row, Col } from 'react-bootstrap';

const ExpensesDisplay = ({ budget }) => {
    const [allExpenses, setAllExpenses] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [currentPage, setCurrentPage] = useState(() => parseInt(localStorage.getItem('currentPage')) || 1);
    const [message, setMessage] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [expenseToDelete, setExpenseToDelete] = useState(null);
    const itemsPerPage = 10;
    const history = useHistory();
    const deleteConfirmRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('currentPage', currentPage);
    }, [currentPage]);

    const fetchAllExpenses = async () => {
        let fetchedExpenses = [];
        let page = 1;
        let totalPages = 1;

        try {
            while (page <= totalPages) {
                const response = await axiosRes.get(`/expenses/?page=${page}&limit=${itemsPerPage}`);
                const { results, count } = response.data;

                fetchedExpenses = [...fetchedExpenses, ...results];
                totalPages = Math.ceil(count / itemsPerPage);
                page++;
            }

            setAllExpenses(fetchedExpenses);
        } catch (err) {
            console.error('Failed to fetch all expenses:', err);
            setMessage('Failed to fetch all expenses.');
        }
    };

    const fetchPaginatedExpenses = async (page) => {
        try {
            const response = await axiosRes.get(`/expenses/?page=${page}&limit=${itemsPerPage}`);
            setExpenses(response.data.results);
        } catch (err) {
            console.error('Failed to fetch paginated expenses:', err);
            setMessage('Failed to fetch expenses.');
        }
    };

    useEffect(() => {
        fetchAllExpenses();
        fetchPaginatedExpenses(currentPage);
    }, [currentPage]);

    const totalAmount = allExpenses.reduce((acc, expense) => acc + Number(expense.amount), 0);
    const remainingBudget = budget - totalAmount;

    const nextPage = () => {
        if (currentPage < Math.ceil(allExpenses.length / itemsPerPage)) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const confirmDelete = (id) => {
        setExpenseToDelete(id);
        setShowDeleteConfirm(true);

        setTimeout(() => {
            deleteConfirmRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    const handleDelete = async () => {
        if (expenseToDelete) {
            try {
                await axiosRes.delete(`/expenses/${expenseToDelete}/`);
                setMessage('Expense deleted successfully.');
                setAllExpenses((prevExpenses) => prevExpenses.filter(exp => exp.id !== expenseToDelete));
                if (expenses.length === 1 && currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                } else {
                    fetchPaginatedExpenses(currentPage);
                }
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

    return (
        <Container>
            {message && (
                <Alert variant={message.includes('successfully') ? 'success' : 'danger'}>
                    {message}
                </Alert>
            )}

            {showDeleteConfirm && (
                <Alert ref={deleteConfirmRef} variant="warning" style={{ marginTop: '20px' }}>
                    <p>Are you sure you want to delete this expense?</p>
                    <div className="d-flex justify-content-end">
                        <Button variant="danger" onClick={handleDelete} className="me-2">
                            Yes, Delete
                        </Button>
                        <Button variant="secondary" onClick={handleCancelDelete}>
                            Cancel
                        </Button>
                    </div>
                </Alert>
            )}

            <ExpensesForm onSubmit={() => {
                fetchAllExpenses();
                fetchPaginatedExpenses(currentPage);
            }} />

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
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        onClick={() => handleEdit(expense.id)}
                                        className={`${styles['edit-icon']} me-3 text-primary`}
                                    />
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        onClick={() => confirmDelete(expense.id)}
                                        className={`${styles['delete-icon']} text-danger`}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>No expenses found.</p>
            )}

            <Row>
                <Col xs={12}>
                    <h5>Total Expenses: ${totalAmount.toFixed(2)}</h5>
                    <h5>Remaining Budget: ${remainingBudget.toFixed(2)}</h5>
                </Col>
            </Row>

            <Row className="pagination d-flex justify-content-between align-items-center flex-nowrap">
                <Col xs="auto">
                    <Button variant="secondary" onClick={prevPage} disabled={currentPage === 1}>
                        <FontAwesomeIcon icon={faChevronLeft} /> Previous
                    </Button>
                </Col>
                <Col xs="auto" className="text-center">
                    <span>Page {currentPage} of {Math.ceil(allExpenses.length / itemsPerPage)}</span>
                </Col>
                <Col xs="auto">
                    <Button variant="secondary" onClick={nextPage} disabled={currentPage === Math.ceil(allExpenses.length / itemsPerPage)}>
                        Next <FontAwesomeIcon icon={faChevronRight} />
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ExpensesDisplay;
