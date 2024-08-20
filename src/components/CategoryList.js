import React from 'react';

const CategoryList = ({ categories }) => {
  if (!Array.isArray(categories) || categories.length === 0) {
    return <p>No categories available</p>;
  }

  return (
    <div>
      <h2>Your Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;