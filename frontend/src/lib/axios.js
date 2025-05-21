import axios from "axios";

// Don't append /api as the API functions already include it
const BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.MODE === "development" ? "http://localhost:5000" : "https://talkly.onrender.com");

// Debug log
console.log("Using API base URL:", BASE_URL);

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies with the request
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Debug log
    console.log(`Making ${config.method.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
