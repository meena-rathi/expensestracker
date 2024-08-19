import React from 'react';
import styles from '../../src/styles/CategoryList.module.css';


const CategoryList = ({ categories }) => {
  if (!Array.isArray(categories) || categories.length === 0) {
    return <p>No categories available</p>;
  }

  

  return (
    <div className={styles.categoryList}>
      <h2>Your Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index} className={styles.categoryItem}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;


