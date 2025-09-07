// src/services/blogService.js

import api from '../api/api';

const getAllBlogs = async () => {
  try {
    const response = await api.get('/blogs');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch blogs' };
  }
};

const getBlogBySlug = async (slug) => {
  try {
    const response = await api.get(`/blogs/${slug}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch blog post' };
  }
};

const createBlog = async (formData) => {
  try {
    const response = await api.post('/blogs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create blog post' };
  }
};

const getBlogById = async (blogId) => {
    try {
        const response = await api.get(`/blogs/id/${blogId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch blog for editing' };
    }
};

const updateBlog = async (blogId, formData) => {
    try {
        const response = await api.put(`/blogs/${blogId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to update blog post' };
    }
};

const deleteBlog = async (blogId) => {
    try {
        const response = await api.delete(`/blogs/${blogId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to delete blog post' };
    }
};

const toggleLikeOnBlog = async (blogId) => {
    try {
        const response = await api.patch(`/blogs/${blogId}/like`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to update like status' };
    }
};

// This is the corrected function
const getPostsByUserId = async (userId) => {
  try {
    const res = await api.get(`/blogs/user/${userId}`);
    return { success: true, data: res.data.data };
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Failed to fetch blogs" };
  }
};

export { 
    getAllBlogs, 
    getBlogBySlug, 
    createBlog,
    getBlogById,
    updateBlog,
    deleteBlog,
    toggleLikeOnBlog,
    getPostsByUserId 
};
