import { useState, useEffect } from 'react';
// import studentService from '../services/studentService.js';
import studentService from '../services/studentService.js';
const useStudent = (id) => {
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      studentService.getStudent(id)
        .then((data) => {
          setStudent(data);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, [id]);

  return { student, isLoading };
};

export default useStudent;







