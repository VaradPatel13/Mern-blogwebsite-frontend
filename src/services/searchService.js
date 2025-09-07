// src/services/searchService.js (NEW FILE)
import api from '../api/api';

const searchSite = async (query) => {
  try {
    const response = await api.get(`/search?q=${query}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Search failed' };
  }
};

export { searchSite };