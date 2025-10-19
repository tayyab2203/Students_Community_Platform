// import apiClient from './apiClient';

// const searchService = {
//   search: async (q, category) => {
//     const response = await apiClient.get('/students/search', { params: { q, category } });
//     return response.data;
//   },
// };


// export default searchService;

import apiClient from './apiClient';

const searchService = {
  search: async (q = '', category = '') => {
    const response = await apiClient.get('/students', { params: { q, category } });  // Uses controller's query handling
    return response.data;
  },
};

export default searchService;
