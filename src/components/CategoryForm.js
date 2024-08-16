import React, {useState} from "react";
import styles from '../../src/styles/CategoryForm.module.css'

const CategoryForm =({onSubmit})=>
{
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const handleInputChange = (e) => {
      setName(e.target.value);
    };
    const handleSubmit=(e)=>{
      e.preventDefault();
      if (name)
        {
          onSubmit({name})
          setName('');
        } else {
          setError('Please enter a category name');
        }
          };
    
    return (
      <form className={styles.categoryForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={handleInputChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Add Category
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    );
  };
  
  export default CategoryForm;