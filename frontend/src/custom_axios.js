import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/', // Replace with your API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add the Authorization header to the instance with the token
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token'); // Get your access token
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
