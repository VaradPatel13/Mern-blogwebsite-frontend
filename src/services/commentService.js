// src/services/commentService.js (NEW FILE)
// A dedicated service for all comment-related API calls.

import api from '../api/api';

const getCommentsForBlog = async (blogId) => {
  try {
    const response = await api.get(`/comments/${blogId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch comments' };
  }
};

const addComment = async (blogId, text) => {
  try {
    const response = await api.post(`/comments/${blogId}`, { text });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to add comment' };
  }
};

export { getCommentsForBlog, addComment };