import React, { useState } from 'react';
import { useCurrentUser } from '../contexts/CurrentUserContext';  // Ensure this hook provides current user information


const ExpensesForm = ({ categories, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  // const [category, setCategory] = useState('');
  
  const [error, setError] = useState('');
  const currentUser = useCurrentUser(); // Get the current user
  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  // const handleCategoryChange = (e) => setCategory(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !description) {
      setError('Please fill in all fields');
      return;
    }

    if (currentUser) {
      const expenseData = {
        amount,
        description,
        //category,
        // category:parseInt(category,10),
        user: currentUser.id, // Ensure user ID is passed correctly
      };

      onSubmit(expenseData);
      setAmount('');
      setDescription('');
      // setCategory('');
    } else {
      setError('You must be logged in to add an expense');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={handleAmountChange}
      />
      {/* <select value={category} onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select> */}
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={handleDescriptionChange}
      />
      <button type="submit">Add Expense</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default ExpensesForm;