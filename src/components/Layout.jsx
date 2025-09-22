import React from "react";
import { Box, CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import TopBar from "./Navigation"; // Existing top bar
import SideBar from "./Sidebar"; // To be created
import { useSidebar } from "../contexts/SidebarContext"; // Import useSidebar

const drawerWidth = 240; // Standard drawer width
const collapsedDrawerWidth = 60; // Collapsed drawer width

export default function Layout({ children }) {
  const { isCollapsed, isMobile } = useSidebar();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const currentDrawerWidth =
    isCollapsed && !isMobile ? collapsedDrawerWidth : drawerWidth;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {isAuthenticated && (
        <>
          <TopBar drawerWidth={currentDrawerWidth} />
          <SideBar drawerWidth={currentDrawerWidth} />
        </>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: isAuthenticated
            ? { sm: `calc(100% - ${currentDrawerWidth}px)` }
            : "100%",
          mt: isAuthenticated ? { xs: 5, sm: 6 } : 0, // Add top margin to account for fixed AppBar only when authenticated
          transition: (theme) =>
            theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
