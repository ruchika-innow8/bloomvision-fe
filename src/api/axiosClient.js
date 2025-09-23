// src/api/axiosClient.js
import axios from "axios";
import store from "../store/store";
import { logout } from "../store/slices/authSlice";

const API_BASE_URL = "http://localhost:5000";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    // const state = store.getState();
    // use local storage
    const token = localStorage.getItem("token");
    console.log("token", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh and errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If token is expired (401) and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        const refreshResult = await refreshAccessToken();

        if (refreshResult.success) {
          // Update the authorization header with new token
          const state = store.getState();
          const newToken = state.auth.token;

          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            // Retry the original request with new token
            return axiosInstance(originalRequest);
          }
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
      }

      // If refresh fails or no new token, logout user
      handleUnauthorizedAccess();
      return Promise.reject(error);
    }

    // Handle other error status codes
    if (error.response?.status === 403) {
      console.warn("Access forbidden - redirecting to unauthorized page");
      // TODO: Implement redirect to unauthorized page when backend is ready
    }

    return Promise.reject(error);
  }
);

// Refresh token function (to be implemented when backend supports it)
const refreshAccessToken = async () => {
  try {
    // TODO: Implement refresh token API call when backend supports it
    // For now, this is a placeholder that will be updated later
    console.log("Attempting to refresh token...");

    // Simulate refresh token API call
    // const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
    //   refreshToken: getStoredRefreshToken()
    // });

    // For now, we'll just return success: false to trigger logout
    // This will be updated when refresh token endpoint is available
    return { success: false };
  } catch (error) {
    console.error("Refresh token API call failed:", error);
    return { success: false };
  }
};

// Handle unauthorized access (redirect/ logout)
const handleUnauthorizedAccess = () => {
  console.warn("User session expired or invalid - logging out");

  // Dispatch logout action
  store.dispatch(logout());

  // TODO: Implement redirect logic when backend supports it
  // For now, we'll just logout the user
  // window.location.href = '/signin';

  // You can add redirect logic here later when backend is ready
  // Example: window.location.href = '/unauthorized';
};

// Utility function to get stored refresh token (placeholder)
const getStoredRefreshToken = () => {
  // TODO: Implement when refresh tokens are stored
  return localStorage.getItem("refreshToken");
};

// Utility function to update stored tokens (placeholder)
export const updateStoredTokens = (accessToken, refreshToken = null) => {
  // TODO: Implement when refresh tokens are supported
  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }
};

export default axiosInstance;
