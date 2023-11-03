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


let isRefreshing = false;
let refreshQueue = [];
let refreshAttempts = 0;
const MAX_REFRESH_ATTEMPTS = 3;
const invalid_token_code = 'token_not_valid';

// Function to refresh the token
const refreshToken = async () => {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      refreshQueue.push({ resolve, reject });
    });
  }

  if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
    return Promise.reject("Max refresh attempts reached");
  }

  isRefreshing = true;
  refreshAttempts++;

  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    return Promise.reject("No refresh token available");
  }

  try {
    const response = await axiosInstance.post("/api/login/refresh/", {
      refresh: refreshToken,
    });
    const newAccessToken = response.data.access;
    localStorage.setItem("access_token", newAccessToken);
    console.log("Access token: " + localStorage.getItem("access_token"));
    isRefreshing = false;

    // Retry queued requests with the new access token
    retryQueuedRequests(newAccessToken);
  } catch (error) {
    isRefreshing = false;
    return Promise.reject(error);
  }
};

// Add a response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401 && error.response.data.detail.code == invalid_token_code) {
      console.log(error)
      if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
        return Promise.reject("Max refresh attempts reached");
      }

      try {
        const newAccessToken = await refreshToken();
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(error.config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Retry queued requests with the new access token
function retryQueuedRequests(newAccessToken) {
  refreshQueue.forEach((request) => {
    request.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
    axiosInstance(request.config)
      .then(request.resolve)
      .catch(request.reject);
  });
  refreshQueue = [];
}

export default axiosInstance;