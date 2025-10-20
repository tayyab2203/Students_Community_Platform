import { useState, useEffect } from 'react';
import searchService from '../services/searchService';

const useSearch = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    searchService.search(search, category)
      .then((data) => {
        setStudents(data.data || []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [search, category]);

  return { students, isLoading, search, setSearch, category, setCategory };
};

export default useSearch;