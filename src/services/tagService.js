// src/services/tagService.js (NEW FILE)

import api from '../api/api';

const getAllTags = async () => {
  try {
    const response = await api.get('/tags');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch tags' };
  }
};

const createTag = async (name) => {
  try {
    const response = await api.post('/tags', { name });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create tag' };
  }
};

export { getAllTags , createTag };
