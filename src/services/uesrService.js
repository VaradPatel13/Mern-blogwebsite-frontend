// src/services/userService.js

import api from '../api/api';

const getMyBlogs = async () => {
  try {
    const response = await api.get('/users/me/blogs');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch your blogs' };
  }
};

const getUserProfile = async (username) => {
  try {
    const response = await api.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch user profile' };
  }
};

const getUserStats = async () => {
  try {
    const response = await api.get('/users/me/stats');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch user stats' };
  }
};

const updateUserDetails = async (userData) => {
  try {
    const response = await api.patch('/users/me', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update profile' };
  }
};

const updateUserAvatar = async (formData) => {
  try {
    const response = await api.patch('/users/me/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update avatar' };
  }
};

const changePassword = async (passwordData) => {
  try {
    const response = await api.patch('/users/me/change-password', passwordData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to change password' };
  }
};

const sendMobileOtp = async (mobileNumber) => {
    try {
        const response = await api.post('/users/me/send-mobile-otp', { mobileNumber });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to send OTP' };
    }
};

const verifyMobileOtp = async (otp) => {
    try {
        const response = await api.post('/users/me/verify-mobile-otp', { otp });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to verify OTP' };
    }
};

const getCurrentUser = async () => {
  try {
    const response = await api.get('/users/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'User not authenticated' };
  }
};

export { 
    getMyBlogs, 
    getUserProfile, 
    getUserStats,
    updateUserDetails, 
    updateUserAvatar,
    changePassword,
    sendMobileOtp,
    verifyMobileOtp,
    getCurrentUser
};