// src/services/authService.js (NEW FILE)
// This file contains functions that interact directly with our backend's auth endpoints.

import api from '../api/api';

const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data; // The API response from our backend
  } catch (error) {
    // Axios wraps the error response in error.response
    throw error.response?.data || { message: 'An unknown error occurred' };
  }
};

const registerUser = async (fullName, username, email, password) => {
    try {
        const response = await api.post('/auth/register', { fullName, username, email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'An unknown error occurred' };
    }
};

const logoutUser = async () => {
    try {
        const response = await api.post('/auth/logout');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'An unknown error occurred' };
    }
};

const getCurrentUser = async () => {
  try {
    // This endpoint is protected and relies on the httpOnly cookie
    const response = await api.get('/users/me');
    return response.data;
  } catch (error) {
    // If it fails (e.g., 401 Unauthorized), it means no valid token was found
    throw error.response?.data || { message: 'User not authenticated' };
  }
};

// This function was missing or not exported
const loginWithGoogle = async (credential) => {
    try {
        const response = await api.post('/auth/google-login', { credential });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Google login failed' };
    }
};

const forgotPassword = async (email) => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  }
  catch (error) {
    throw error.response?.data || { message: 'An unknown error occurred' };
  }
};


export { loginUser, registerUser, logoutUser , getCurrentUser , loginWithGoogle , forgotPassword };