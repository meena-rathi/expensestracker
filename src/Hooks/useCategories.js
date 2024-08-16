import { useState, useEffect } from 'react';
import axios from 'axios';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/categories/');
        setCategories(response.data);
      } catch (err) {
        setError('Error fetching categories');
      }
    };
    fetchCategories();
  }, []);

  const addCategory = async (category) => {
    try {
      const response = await axios.post('/categories/', category);
      setCategories([...categories, response.data]);
    } catch (err) {
      setError('Error adding category');
    }
  };

  return {
    categories,
    addCategory,
    error,
  };
};

export default useCategories;