// import React, { useState, useEffect } from 'react';
// import { useParams, useHistory } from 'react-router-dom';
// import { axiosReq } from '../api/axiosDefaults';

// function ExpenseEditForm() {
//     const { id } = useParams();
//     const [expenseData, setExpenseData] = useState({
//         amount: '',
//         description: '',
//         date: '',
//     });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const history = useHistory();

//     useEffect(() => {
//         const fetchExpense = async () => {
//             try {
//                 const { data } = await axiosReq.get(`/expenses/${id}/`);
//                 setExpenseData({
//                     amount: data.amount,
//                     description: data.description,
//                     date: data.date,
//                 });
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Failed to fetch expense:', error);
//                 setError('Failed to load expense.');
//                 setLoading(false);
//             }
//         };

//         fetchExpense();
//     }, [id]);

//     const handleChange = (event) => {
//         setExpenseData({
//             ...expenseData,
//             [event.target.name]: event.target.value,
//         });
//     };

//     const handleSubmit = async (event) => {
//       event.preventDefault();
//       try {
//           const response = await axiosReq.put(`/expenses/${id}/`, expenseData);
//           console.log('Update response:', response.data);
//           history.push('/home');
//       } catch (error) {
//           console.error('Failed to update expense:', error.response ? error.response.data : error.message);
//           setError('Failed to update expense.');
//       }
//   };
//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="number"
//                 name="amount"
//                 value={expenseData.amount}
//                 onChange={handleChange}
//             />
//             <input
//                 type="text"
//                 name="description"
//                 value={expenseData.description}
//                 onChange={handleChange}
//             />
//             <input
//                 type="date"
//                 name="date"
//                 value={expenseData.date}
//                 onChange={handleChange}
//             />
//             <button type="submit">Save</button>
//         </form>
//     );
// }

// export default ExpenseEditForm;


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
        setExpenseData({
            ...expenseData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axiosReq.put(`/expenses/${id}/`, expenseData);
            console.log('Update response:', response.data);
            history.push('/home');
        } catch (error) {
            console.error('Failed to update expense:', error.response ? error.response.data : error.message);
            setError('Failed to update expense.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2>Edit Expense</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                name="amount"
                                value={expenseData.amount}
                                onChange={handleChange}
                                placeholder="Enter amount"
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={expenseData.description}
                                onChange={handleChange}
                                placeholder="Enter description"
                            />
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