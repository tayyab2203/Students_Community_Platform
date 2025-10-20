import apiClient from './apiClient';

const searchService = {
  search: async (q, category) => {
    const response = await apiClient.get('/students/search', { params: { q, category } });
    return response.data;
  },
};

export default searchService;