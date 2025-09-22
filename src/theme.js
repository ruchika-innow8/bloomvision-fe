import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#f8f9fa",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          // Ensure AppBar does not have default shadow when used with Drawer
          boxShadow: "none",
          borderBottom: "1px solid #e0e0e0",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          // Adjust sidebar paper style if needed, already set in Sidebar.jsx
        },
      },
    },
  },
});

export default theme;
