// src/routes/routes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../pages/auth/SignIn";
import Dashboard from "../pages/Dashboard";
import OrganisationPage from "../pages/organisation";
import UsersPage from "../pages/Users";
import AnalyticsPage from "../pages/Analytics";
import SettingsPage from "../pages/Settings";
import TemplatesPage from "../pages/Templates";
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
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <UsersPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <PrivateRoute>
            <AnalyticsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/templates"
        element={
          <PrivateRoute>
            <TemplatesPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <SettingsPage />
          </PrivateRoute>
        }
      />
      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/signin" />} />
    </Routes>
  );
}
