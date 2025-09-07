// src/services/categoryService.js (NEW FILE)

import api from '../api/api';

const getAllCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch categories' };
  }
};

const getBlogsByCategory = async (slug) => {
    try {
        const response = await api.get(`/categories/${slug}/blogs`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch blogs for this category' };
    }
}

const createCategory = async (name) => {
    try {
        const response = await api.post('/categories', { name });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to create category' };
    }
};

export { getAllCategories, getBlogsByCategory , createCategory };
