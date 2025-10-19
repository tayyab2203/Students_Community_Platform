// import apiClient from './apiClient';

// // Named exports
// export const getStudents = async () => {
//   const response = await apiClient.get('/students');
//   return response.data;
// };

// export const getStudent = async (id) => {
//   const response = await apiClient.get(`/students/${id}`);
//   return response.data;
// };

// // Default export (object form)
// const studentService = { getStudents, getStudent };
// export default studentService;

import apiClient from './apiClient';

// Named exports
export const getStudents = async () => {
  const response = await apiClient.get('/students');  // Base list
  return response.data;
};

export const getStudent = async (id) => {
  const response = await apiClient.get(`/students/${id}`);  // Detail by ID
  return response.data;
};

// Default export (object form)
const studentService = { getStudents, getStudent };
export default studentService;
