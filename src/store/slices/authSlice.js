// src/store/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Load user/token from localStorage if available
const storedAuth = JSON.parse(localStorage.getItem("auth"));

const initialState = {
  user: storedAuth?.user || null,
  token: storedAuth?.token || null,
  isAuthenticated: storedAuth?.isAuthenticated || false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      // Save to localStorage
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: state.user,
          token: state.token,
          isAuthenticated: true,
        })
      );
    },
    bypassLogin: (state) => {
      // Temporary bypass for testing
      state.user = {
        id: "temp-user",
        name: "Test User",
        email: "test@example.com",
        role: "Admin", // Add a default role for bypass login
      };
      state.token = "temp-token";
      state.isAuthenticated = true;

      // Set bypass flag
      localStorage.setItem("bypassAuth", "true");
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: state.user,
          token: state.token,
          isAuthenticated: true,
        })
      );
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // Clear from localStorage
      localStorage.removeItem("auth");
      localStorage.removeItem("bypassAuth");
    },
  },
});

export const { loginSuccess, bypassLogin, logout } = authSlice.actions;
export default authSlice.reducer;
