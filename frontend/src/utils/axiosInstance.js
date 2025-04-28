// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:8000/api/',
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${localStorage.getItem("access")}`,
//   }
// });

// export default api;

// src/utils/axiosInstance.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

// Interceptor to handle token refresh
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // If token expired and we haven’t retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh');
        const res = await axios.post('http://localhost:8000/api/token/refresh/', {
          refresh: refreshToken,
        });

        const newAccess = res.data.access;
        localStorage.setItem('access', newAccess);

        // Update header and retry original request
        originalRequest.headers['Authorization'] = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (refreshErr) {
        console.error('Refresh failed:', refreshErr);
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.href = '/login'; // redirect to login
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

// Attach access token to all requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
