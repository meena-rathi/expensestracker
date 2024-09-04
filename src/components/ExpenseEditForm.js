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


// import React, { useState, useEffect } from 'react';
// import { useParams, useHistory } from 'react-router-dom';
// import { axiosReq } from '../api/axiosDefaults';
// import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

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
//         event.preventDefault();
//         try {
//             const response = await axiosReq.put(`/expenses/${id}/`, expenseData);
//             console.log('Update response:', response.data);
//             history.push('/home');
//         } catch (error) {
//             console.error('Failed to update expense:', error.response ? error.response.data : error.message);
//             setError('Failed to update expense.');
//         }
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <Alert variant="danger">{error}</Alert>;

//     return (
//         <Container>
//             <Row className="justify-content-md-center">
//                 <Col md={6}>
//                     <h2>Edit Expense</h2>
//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group controlId="formAmount">
//                             <Form.Label>Amount</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 name="amount"
//                                 value={expenseData.amount}
//                                 onChange={handleChange}
//                                 placeholder="Enter amount"
//                             />
//                         </Form.Group>

//                         <Form.Group controlId="formDescription">
//                             <Form.Label>Description</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="description"
//                                 value={expenseData.description}
//                                 onChange={handleChange}
//                                 placeholder="Enter description"
//                             />
//                         </Form.Group>

//                         <Form.Group controlId="formDate">
//                             <Form.Label>Date</Form.Label>
//                             <Form.Control
//                                 type="date"
//                                 name="date"
//                                 value={expenseData.date}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>

//                         <Button variant="primary" type="submit" className="mt-3">
//                             Save
//                         </Button>
//                     </Form>
//                 </Col>
//             </Row>
//         </Container>
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
    const [success, setSuccess] = useState(''); // State for success message
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

        // Validation logic
        if (name === 'amount') {
            if (/^\d*\.?\d*$/.test(value)) {
                setExpenseData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
                setError(''); // Clear any previous errors
            } else {
                setError('Amount must be a valid number');
            }
        } else if (name === 'description') {
            if (/^[a-zA-Z\s]*$/.test(value)) {
                setExpenseData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
                setError(''); // Clear any previous errors
            } else {
                setError('Description must only contain letters and spaces');
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
        
        // Basic validation before submission
        if (!expenseData.amount || !expenseData.description) {
            setError('Please fill in all required fields with valid values.');
            return;
        }

        try {
            const response = await axiosReq.put(`/expenses/${id}/`, expenseData);
            console.log('Update response:', response.data);
            setSuccess('Record updated successfully!'); // Set success message
            setTimeout(() => {
                history.push('/home'); // Redirect after a short delay
            }, 2000); // 2 seconds delay before redirecting
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
                    {success && <Alert variant="success">{success}</Alert>} {/* Success message */}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
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
