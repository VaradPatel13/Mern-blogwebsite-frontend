// src/api/api.js (NEW FILE)
// This file configures our central Axios instance for making API calls.

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1', 
  withCredentials: true, 
});

export default api;

//https://mern-blogwebsite-backend.onrender.com/api/v1
//http://localhost:8000/api/v1
