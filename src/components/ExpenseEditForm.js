import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { axiosReq } from '../api/axiosDefaults';

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
          history.push('/view-expenses');
      } catch (error) {
          console.error('Failed to update expense:', error.response ? error.response.data : error.message);
          setError('Failed to update expense.');
      }
  };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                name="amount"
                value={expenseData.amount}
                onChange={handleChange}
            />
            <input
                type="text"
                name="description"
                value={expenseData.description}
                onChange={handleChange}
            />
            <input
                type="date"
                name="date"
                value={expenseData.date}
                onChange={handleChange}
            />
            <button type="submit">Save</button>
        </form>
    );
}

export default ExpenseEditForm;