import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { axiosReq } from '../api/axiosDefaults';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

function ExpenseEditForm() {
    const { id } = useParams();
    const [expenseData, setExpenseData] = useState({
        amount: '',
        description: '',
        date: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const history = useHistory();

    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const { data } = await axiosReq.get(`/expenses/${id}/`);
                setExpenseData({
                    amount: data.amount,
                    description: data.description,
                    date: data.date,
                });
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch expense:', error);
                setError('Failed to load expense.');
                setLoading(false);
            }
        };

        fetchExpense();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'amount') {
            // Allow only numeric values
            if (/^\d*\.?\d*$/.test(value)) {
                setExpenseData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
                setError(''); // Clear error if valid
            } else {
                setError('Amount must contain only numeric values.');
            }
        } else if (name === 'description') {
            // Allow only alphabetic characters (no numbers or symbols)
            if (/^[a-zA-Z]+$/.test(value)) {
                setExpenseData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
                setError(''); // Clear error if valid
            } else {
                setError('Description must only contain alphabetic characters without spaces or symbols.');
            }
        } else {
            setExpenseData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check for missing or invalid values
        if (!expenseData.amount || !expenseData.description) {
            setError('Please fill in all required fields with valid values.');
            return;
        }

        try {
            const response = await axiosReq.put(`/expenses/${id}/`, expenseData);
            console.log('Update response:', response.data);
            setSuccess('Record updated successfully!');
            setTimeout(() => {
                history.push('/home');
            }, 2000);
        } catch (error) {
            console.error('Failed to update expense:', error.response ? error.response.data : error.message);
            setError('Failed to update expense.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error && !expenseData.amount && !expenseData.description) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2>Edit Expense</h2>
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="text"  // Set type to text to apply custom validation
                                name="amount"
                                value={expenseData.amount}
                                onChange={handleChange}
                                placeholder="Enter amount"
                                isInvalid={!!error && error.includes('Amount')}
                            />
                            <Form.Control.Feedback type="invalid">
                                {error && error.includes('Amount') && error}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={expenseData.description}
                                onChange={handleChange}
                                placeholder="Enter description"
                                isInvalid={!!error && error.includes('Description')}
                            />
                            <Form.Control.Feedback type="invalid">
                                {error && error.includes('Description') && error}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={expenseData.date}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Save
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default ExpenseEditForm;
