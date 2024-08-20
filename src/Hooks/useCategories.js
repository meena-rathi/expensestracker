import { useState, useEffect } from 'react';
import axios from 'axios';

// const useCategories = () => {
//   const [categories, setCategories] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get('/categories/');
//         setCategories(response.data); // Assuming the response is an array of categories
//       } catch (err) {
//         setError('Error fetching categories');
//       }
//     };

//     fetchCategories();
//   }, []);

//   const addCategory = async (newCategory) => {
//     try {
//       const response = await axios.post('/categories/', newCategory);
//       setCategories(prevCategories => {
//         if (Array.isArray(prevCategories)) {
//           return [...prevCategories, response.data];
//         } else {
//           return [response.data];
//         }
//       });
//     } catch (err) {
//       console.error("Error adding category:", err);
//       setError('Error adding category');
//     }
//   };

//   return { categories, addCategory, error };
// };

// export default useCategories;







// const useCategories = () => {
//   const [categories, setCategories] = useState([]); // Start with an empty array
//   const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get('/categories/');
//         console.log('API Response:', response.data);
//         setCategories(response.data); // Assuming response.data is an array of categories
//         setIsLoaded(true);
//       } catch (err) {
//         console.error('Failed to load categories:', err.response ? err.response.data : err.message);
//         setError('Failed to load categories');
//         setIsLoaded(true);
//       }
//     };

//     fetchCategories();
//   }, []); // Empty dependency array to run only once on mount

//   const addCategory = async (newCategory) => {
//     try {
//       const response = await axios.post('/categories/', newCategory);
//       setCategories((prevCategories) => [...prevCategories, response.data]);
//       setError(null);
//     } catch (err) {
//       setError('Failed to add category');
//     }
//   };

//   return { categories, addCategory, error, isLoaded };
// };

// export default useCategories;







const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/categories/'); // Make sure this endpoint is correct
        console.log('API Response:', response.data);

        if (Array.isArray(response.data.results)) {
          setCategories(response.data.results); // Set categories from the results array
        } else {
          setCategories([]); // Fallback if data isn't in expected format
        }
        setIsLoaded(true);
      } catch (err) {
        console.error('Failed to load categories:', err.response ? err.response.data : err.message);
        setError('Failed to load categories');
        setIsLoaded(true);
      }
    };

    fetchCategories();
  }, []); // Run once on component mount

  const addCategory = async (newCategory) => {
    try {
      const response = await axios.post('/categories/', newCategory);
      setCategories((prevCategories) => [...prevCategories, response.data]);
      setError(null);
    } catch (err) {
      setError('Failed to add category');
    }
  };

  return { categories, addCategory, error, isLoaded };
};

export default useCategories;