// src/routes/routes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../pages/auth/SignIn";
import Dashboard from "../pages/Dashboard";
import OrganisationPage from "../pages/organisation";
import { PrivateRoute } from "./routesFunction";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/organisation"
        element={
          <PrivateRoute>
            <OrganisationPage />
          </PrivateRoute>
        }
      />
      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/signin" />} />
    </Routes>
  );
}
