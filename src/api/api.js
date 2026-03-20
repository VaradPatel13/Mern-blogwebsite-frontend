import axios from 'axios';
//https://mern-blogwebsite-backend.onrender.com/api/v1
const api = axios.create({
  baseURL: 'https://mern-blogwebsite-backend.onrender.com/api/v1',
  withCredentials: true,
});

// Response interceptor for catching 401 Unauthorized errors
api.interceptors.response.use(
  (response) => {
    // Return a successful response back to the calling function
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and we haven't already tried to refresh the token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark as retried so we don't end up in an infinite loop

      try {
        // Attempt to refresh the token
        await axios.post('https://mern-blogwebsite-backend.onrender.com/api/v1/auth/refresh-token', {}, {
          withCredentials: true
        });

        // If successful, retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If the refresh token also fails, redirect to login or handle session expiration
        console.error("Session expired. Please log in again.");
        // Usually handled globally or by clearing auth state in Context
      }
    }

    // Return the original error if it wasn't a 401 or refresh failed
    return Promise.reject(error);
  }
);

export default api;