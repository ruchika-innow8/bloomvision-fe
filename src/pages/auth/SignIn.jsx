// src/pages/SignIn.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { loginSuccess, bypassLogin } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { loginWithEmail, loginWithGoogle } from "../../api/authApi";
import { loginSchema } from "../../utils/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  InputAdornment,
  IconButton,
  Divider,
  CircularProgress,
  Link,
  Grid,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false); // Add loading state
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Email/Password login
  const handleEmailLogin = async (data) => {
    setLoading(true); // Set loading to true on submission
    const { email, password } = data;

    try {
      const result = await loginWithEmail(email, password);
      dispatch(loginSuccess(result));
      navigate("/dashboard");
    } catch (error) {
      console.error("Email login failed", error);
    } finally {
      setLoading(false); // Set loading to false after submission (success or error)
    }
  };

  // Google login
  const handleGoogleLogin = async (credentialResponse) => {
    setLoading(true); // Set loading to true for Google login as well
    try {
      const token = credentialResponse.credential;
      const decoded = jwtDecode(token); // ✅ works now
      const data = await loginWithGoogle(decoded, token);

      dispatch(loginSuccess(data));
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login failed", error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  // Temporary bypass login for testing
  const handleBypassLogin = () => {
    dispatch(bypassLogin());
    navigate("/organisation");
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
          width: "100%",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Sign In
        </Typography>

        {/* Email/Password Form */}
        <Box
          component="form"
          onSubmit={handleSubmit(handleEmailLogin)}
          noValidate
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading} // Disable button when loading
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"} {/* Show spinner when loading */}
          </Button>
        </Box>

        <Divider sx={{ my: 3, width: "100%" }}>
          <Typography variant="caption" color="text.secondary">
            OR
          </Typography>
        </Divider>

        {/* Google Login */}
        <Box sx={{ mt: 2, mb: 2 }}>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.error("Google Login Failed")}
            disabled={loading} // Disable Google login when main form is loading
          />
        </Box>

        {/* Temporary Bypass Login for Testing */}
        <Box
          sx={{
            mt: 3,
            pt: 2,
            borderTop: 1,
            borderColor: "divider",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Button
            onClick={handleBypassLogin}
            fullWidth
            variant="contained"
            sx={{ mb: 1, backgroundColor: "#FF9800" }}
            disabled={loading} // Disable bypass login when main form is loading
          >
            🚀 Bypass Login (Testing Only)
          </Button>
          <Typography variant="caption" color="text.secondary">
            Skip authentication to test Organisation page
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
