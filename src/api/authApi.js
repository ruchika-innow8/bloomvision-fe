// src/api/authApi.js

import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

// Email/Password login
export const loginWithEmail = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

// Google login
export const loginWithGoogle = async (decodedUser, token) => {
  // Example: send Google token to backend for login/registration
  const response = await axios.post(`${API_BASE_URL}/auth/google-login`, {
    user: decodedUser,
    token,
  });
  return response.data;
};

// Register API (optional)
export const registerApi = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
  return response.data;
};
