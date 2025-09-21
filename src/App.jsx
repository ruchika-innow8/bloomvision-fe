// src/App.jsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "./components/Layout";
import AppRoutes from "./routes/routes";
import theme from "./theme"; // Import the custom theme
import { SidebarProvider } from "./contexts/SidebarContext";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <SidebarProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </SidebarProvider>
      </Router>
    </ThemeProvider>
  );
}
