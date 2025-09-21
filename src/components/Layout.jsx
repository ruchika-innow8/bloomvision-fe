import React from "react";
import { Box, CssBaseline } from "@mui/material";
import TopBar from "./Navigation"; // Existing top bar
import SideBar from "./Sidebar"; // To be created
import { useSidebar } from "../contexts/SidebarContext"; // Import useSidebar

const drawerWidth = 240; // Standard drawer width
const collapsedDrawerWidth = 60; // Collapsed drawer width

export default function Layout({ children }) {
  const { isCollapsed, isMobile } = useSidebar();
  const currentDrawerWidth = isCollapsed && !isMobile ? collapsedDrawerWidth : drawerWidth;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopBar drawerWidth={currentDrawerWidth} />
      <SideBar drawerWidth={currentDrawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
          mt: { xs: 5, sm: 6 }, // Add top margin to account for fixed AppBar
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
