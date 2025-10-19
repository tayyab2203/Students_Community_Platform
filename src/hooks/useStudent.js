// import { useState, useEffect } from 'react';
// // import studentService from '../services/studentService.js';
// import studentService from '../services/studentService.js';
// const useStudent = (id) => {
//   const [student, setStudent] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (id) {
//       studentService.getStudent(id)
//         .then((data) => {
//           setStudent(data);
//           setIsLoading(false);
//         })
//         .catch(() => setIsLoading(false));
//     }
//   }, [id]);

//   return { student, isLoading };
// };

// export default useStudent;


import { useState, useEffect } from 'react';
import studentService from '../services/studentService.js';

const useStudent = (id) => {
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);  // Add for UX

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      setError(null);
      studentService.getStudent(id)
        .then((data) => {
          setStudent(data);
        })
        .catch((err) => {
          console.error('Failed to fetch student:', err);
          setError('Student not found');
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [id]);

  return { student, isLoading, error };
};

export default useStudent;





