import React, { useState } from 'react';

const ExpensesForm = ({ categories, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && category) {
      onSubmit({ amount, category });
      setAmount('');
      setCategory('');
    } else {
      setError('Please enter an amount and select a category');
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
      <select value={category} onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      <button type="submit">Add Expense</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default ExpensesForm;