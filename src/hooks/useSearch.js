// import { useState, useEffect } from 'react';
// import searchService from '../services/searchService';

// const useSearch = () => {
//   const [search, setSearch] = useState('');
//   const [category, setCategory] = useState('');
//   const [students, setStudents] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     setIsLoading(true);
//     searchService.search(search, category)
//       .then((data) => {
//         setStudents(data.data || []);
//         setIsLoading(false);
//       })
//       .catch(() => setIsLoading(false));
//   }, [search, category]);

//   return { students, isLoading, search, setSearch, category, setCategory };
// };


// export default useSearch;

import { useState, useEffect } from 'react';
import searchService from '../services/searchService';
import { getStudents } from '../services/studentService';  // For initial fetch

const useSearch = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);  // Add for UX

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    searchService.search(search, category)
      .then((data) => {
        setStudents(data.data || data || []);  // Handle paginated or flat response
      })
      .catch((err) => {
        console.error('Search failed:', err);
        setError('Failed to load students');
        setStudents([]);  // Fallback empty
      })
      .finally(() => setLoading(false));
  }, [search, category]);

  // Initial load (if no search/category)
  useEffect(() => {
    if (!search && !category) {
      getStudents().then((data) => setStudents(data.data || data || []));
    }
  }, []);  // Run once on mount

  return { students, isLoading, error, search, setSearch, category, setCategory };
};

export default useSearch;
