import React from "react";
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  Box, // Import Box for flexible layouts
} from "@mui/material";

import {
  Dashboard as DashboardIcon,
  Business as BusinessIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Assessment as AssessmentIcon,
  AutoAwesomeMosaic as AutoAwesomeMosaicIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useSidebar } from "../contexts/SidebarContext";
import { ChevronRight as ChevronRightIcon, ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";

export default function Sidebar({ drawerWidth }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile, mobileOpen, handleDrawerToggle, isCollapsed, toggleCollapse } = useSidebar();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Organisations", icon: <BusinessIcon />, path: "/organisation" },
    { text: "Users", icon: <PeopleIcon />, path: "/users" },
    { text: "Analytics", icon: <AssessmentIcon />, path: "/analytics" },
    { text: "Templates", icon: <AutoAwesomeMosaicIcon />, path: "/templates" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  return (
    <Drawer
      sx={{
        width: isCollapsed && !isMobile ? 60 : drawerWidth, // Collapsed width for desktop
        flexShrink: 0,
        overflow: "hidden", // Prevent scrollbars
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        "& .MuiDrawer-paper": {
          width: isCollapsed && !isMobile ? 60 : drawerWidth, // Collapsed width for desktop
          boxSizing: "border-box",
          bgcolor: "#222e3c", // Dark background for the sidebar
          color: "#ffffff",
          overflow: "hidden", // Prevent scrollbars on paper
          display: "flex",
          flexDirection: "column", // Stack content vertically
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        },
      }}
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? mobileOpen : true}
      onClose={handleDrawerToggle}
      anchor="left"
    >
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        overflow: "hidden"
      }}>
        <Toolbar sx={{
          justifyContent: isCollapsed ? "center" : "flex-start",
          py: 2,
          minHeight: "64px !important"
        }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: 700, display: isCollapsed ? "none" : "block" }}
          >
            BloomVision
          </Typography>
        </Toolbar>
        <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)" }} />
        <Box sx={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}> {/* Allow scrolling only for menu items if needed */}
          <List sx={{ py: 1 }}>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    minHeight: 48,
                    justifyContent: isCollapsed ? "center" : "flex-start",
                    px: 2.5,
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.08)",
                    },
                    bgcolor:
                      location.pathname === item.path
                        ? "rgba(255,255,255,0.12)"
                        : "transparent",
                    borderRadius: "8px",
                    mx: 1,
                    my: 0.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isCollapsed ? "auto" : 3,
                      justifyContent: "center",
                      color: "#ffffff",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      opacity: isCollapsed ? 0 : 1,
                      transition: "opacity 0.2s ease",
                      "& span": { fontWeight: 500 }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      {/* Collapse/Expand button at the bottom of sidebar */}
      {!isMobile && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 1,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            bgcolor: "rgba(34,46,60,0.8)",
            mt: "auto",
          }}
        >
          <IconButton
            aria-label="toggle collapse"
            onClick={toggleCollapse}
            size="small"
            sx={{
              color: "#ffffff",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)",
              }
            }}
          >
            {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Box>
      )}
      </Box>
    </Drawer>
  );
}
