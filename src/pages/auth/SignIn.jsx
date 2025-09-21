// src/pages/SignIn.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { loginSuccess, bypassLogin } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { loginWithEmail, loginWithGoogle } from "../../api/authApi";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Email/Password login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const data = await loginWithEmail(email, password);
      dispatch(loginSuccess(data));
      navigate("/dashboard");
    } catch (error) {
      console.error("Email login failed", error);
    }
  };

  // Google login
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const decoded = jwtDecode(token); // ✅ works now
      const data = await loginWithGoogle(decoded, token);

      dispatch(loginSuccess(data));
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  // Temporary bypass login for testing
  const handleBypassLogin = () => {
    dispatch(bypassLogin());
    navigate("/organisation");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sign In
        </h2>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        <div className="my-6 text-center text-gray-400">OR</div>

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.error("Google Login Failed")}
          />
        </div>

        {/* Temporary Bypass Login for Testing */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={handleBypassLogin}
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition text-sm"
          >
            🚀 Bypass Login (Testing Only)
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">
            Skip authentication to test Organisation page
          </p>
        </div>
      </div>
    </div>
  );
}
