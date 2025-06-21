import axios from 'axios';

// Axios instance for making API requests
const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Your base API URL
});

// Add request interceptor to attach the Access Token to requests
http.interceptors.request.use(
  (config) => {
    // Get the Access Token from sessionStorage (or memory)
    console.log("Request Interceptor: Attaching Access Token");
    const accessToken = sessionStorage.getItem('accessToken');
    
    // If Access Token exists, attach it to the request headers
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle expired tokens
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If the error response is 401 (Unauthorized)
    if (error.response?.status === 401) {
      const refreshToken = getCookie('refreshToken'); // Get refresh token from cookies

      if (refreshToken) {
        try {
          // If we have a refresh token, request a new access token
          const newAccessToken = await refreshAccessToken(refreshToken);

          // Retry the failed request with the new access token
          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return http(error.config);
        } catch (refreshError) {
          // If refreshing the token fails, redirect to login
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

// Function to handle refresh token logic
const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await http.post('/auth/refresh', { refreshToken });
    const { accessToken } = response.data;
    // Store the new Access Token in memory or sessionStorage
    sessionStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    console.error("Refresh token failed:", error);
    throw error;
  }
};

// Function to retrieve cookies (e.g., refresh token from HttpOnly cookie)
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

export { http };
