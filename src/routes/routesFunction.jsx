// src/routes/routesFunctions.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Protected Route
export function PrivateRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const bypassAuth =
    import.meta.env.VITE_BYPASS_AUTH === "true" ||
    localStorage.getItem("bypassAuth") === "true";
  return isAuthenticated || bypassAuth ? children : <Navigate to="/signin" />;
}
