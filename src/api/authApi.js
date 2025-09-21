// src/api/authApi.js

import axiosInstance from "./axiosClient";

// Email/Password login
export const loginWithEmail = async (email, password) => {
  const response = await axiosInstance.post('/auth/login', {
    email,
    password,
  });
  return response.data;
};

// Google login
export const loginWithGoogle = async (decodedUser, token) => {
  // Example: send Google token to backend for login/registration
  const response = await axiosInstance.post('/auth/google-login', {
    user: decodedUser,
    token,
  });
  return response.data;
};

// Register API (optional)
export const registerApi = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData);
  return response.data;
};
