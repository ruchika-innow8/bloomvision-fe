import React, { createContext, useContext, useState, useCallback } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import { fa } from "zod/v4/locales";

const SidebarContext = createContext(null);

export const useSidebar = () => useContext(SidebarContext);

export function SidebarProvider({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  const handleDrawerClose = useCallback(() => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
  }, [mobileOpen]);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const value = {
    isMobile,
    mobileOpen,
    handleDrawerToggle,
    handleDrawerClose,
    isCollapsed,
    toggleCollapse,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}
