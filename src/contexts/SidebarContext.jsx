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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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

  // function to handle user menu state
  const handleUserMenuToggle = useCallback(
    (isOpen) => {
      setIsUserMenuOpen(isOpen);
      // Auto-collapse sidebar when user menu opens (only on desktop)
      if (isOpen && !isMobile) {
        setIsCollapsed(true);
      }
      // Auto-expand sidebar when user menu closes (only on desktop)
      else if (!isOpen && !isMobile) {
        setIsCollapsed(false);
      }
    },
    [isMobile]
  );

  const value = {
    isMobile,
    mobileOpen,
    handleDrawerToggle,
    handleDrawerClose,
    isCollapsed,
    toggleCollapse,
    isUserMenuOpen,
    handleUserMenuToggle,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}
