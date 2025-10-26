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


// export const getStudentById = (id) => apiClient.get(`/students/${id}`);

// // Default export (object form)
// const studentService = { getStudents, getStudent };
// export default studentService;

import apiClient from "./apiClient";

// ✅ Get all students
export const getStudents = async () => {
  const res = await apiClient.get("/students");
  return res.data;
};

// ✅ Get a single student by ID
export const getStudentById = async (id) => {
  const res = await apiClient.get(`/students/${id}`);
  return res.data; // 🔥 returns clean data directly
};

// ✅ Optional: single student legacy
export const getStudent = getStudentById;

// ✅ Default export (optional usage)
const studentService = { getStudents, getStudentById };
export default studentService;
