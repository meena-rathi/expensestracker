import React, { useState } from "react";
import styles from '../../src/styles/ExpensesForm.module.css'


const ExpensesForm = ({ categories = [], onSubmit }) => { // Set default value to an empty array
  const [expenses, setExpenses] = useState({
    category: '', name: '', amount: '',
  });

  const handleChange = (event) => {
    setExpenses({
      ...expenses,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(expenses);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.expensesForm}>
      <label htmlFor="category">Category</label>
      <select
        name="category"
        value={expenses.category}
        onChange={handleChange}
      >
        <option value="">Select a Category</option>
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))
        ) : (
          <option value="">No categories available</option>
        )}
      </select>

      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={expenses.name}
        onChange={handleChange}
      />

      <label htmlFor="amount">Amount</label>
      <input
        type="number"
        name="amount"
        value={expenses.amount}
        onChange={handleChange}
      />

      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpensesForm;