// src/services/searchService.js

import api from '../api/api';

const searchBlogs = async ({ query, page = 1, limit = 12, category, tag, sortBy = "relevance" } = {}) => {
  try {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (page) params.set('page', page);
    if (limit) params.set('limit', limit);
    if (category) params.set('category', category);
    if (tag) params.set('tag', tag);
    if (sortBy) params.set('sortBy', sortBy);

    const response = await api.get(`/search?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Search failed' };
  }
};

const getSearchFacets = async (query) => {
  try {
    const response = await api.get(`/search/facets?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch search facets' };
  }
};

export { searchBlogs, getSearchFacets };
