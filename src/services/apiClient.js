// import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: '/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('auth_token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle errors, e.g., logout on 401
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem('auth_token');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default apiClient;


// import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: 'https://studentscommunity.revivercmsolutions.com/api',
// });

// export default apiClient;

// src/services/apiClient.js
// import axios from 'axios';

// const apiClient = axios.create({

//   baseURL: 'http://localhost:8000/api',
//   // baseURL: 'https://studentscommunity.revivercmsolutions.com/api',
//   withCredentials: true, // 🔥 allows Laravel Sanctum to send/receive cookies
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${localStorage.getItem("auth_token")}`, // ✅ consistent naming
//   },
// });
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("auth_token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
// export default apiClient;



import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// ✅ Request interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Response interceptor for 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired, redirect to login
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login'; // Or use your router
    }
    return Promise.reject(error);
  }
);

export default apiClient;
