import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Business as BusinessIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  // Don't show navigation on sign-in page
  if (location.pathname === "/signin" || !isAuthenticated) {
    return null;
  }

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "#fff",
        color: "#333",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 600 }}
        >
          BloomVision Admin
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            startIcon={<DashboardIcon />}
            onClick={() => navigate("/dashboard")}
            sx={{
              color: location.pathname === "/dashboard" ? "#1976d2" : "#666",
              fontWeight: location.pathname === "/dashboard" ? 600 : 400,
            }}
          >
            Dashboard
          </Button>

          <Button
            startIcon={<BusinessIcon />}
            onClick={() => navigate("/organisation")}
            sx={{
              color: location.pathname === "/organisation" ? "#1976d2" : "#666",
              fontWeight: location.pathname === "/organisation" ? 600 : 400,
            }}
          >
            Organizations
          </Button>
        </Box>

        <Box sx={{ ml: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" sx={{ color: "#666" }}>
            {user?.name || "Test User"}
          </Typography>
          <IconButton
            onClick={handleLogout}
            size="small"
            sx={{ color: "#666" }}
          >
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
