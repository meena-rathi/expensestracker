import React, { useState } from "react";


const ExpensesForm=()=>
    {
        const [expenses, setExpenses] =useState({
            name:'', amount:'',
        });

        const handleChange = (event) => {
            setExpenses({
              ...expenses,
              [event.target.name]: event.target.value,
            });
          };

        const handleSubmit=(e)=>
        {
            e.preventDefault();
        };

        return(
            <form>
            <label htmlFor="name">name</label>
            <input
              type="name"
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
            </form>
        )
    }

export default ExpensesForm;