import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import apiClient from "../api/apiClient";

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👁️ NEW

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await apiClient.post("/auth/login", form);

      const { token, role, profileComplete, message: msg } = res.data;

      if (token) localStorage.setItem("token", token);
      if (role) localStorage.setItem("role", role);
      if (typeof profileComplete === "boolean") {
        localStorage.setItem(
          "profileComplete",
          profileComplete ? "true" : "false"
        );
      }

      if (typeof onLoginSuccess === "function") {
        onLoginSuccess();
      }

      setMessage(msg || "Login successful");

      if (profileComplete) {
        setTimeout(() => navigate("/dashboard"), 800);
      } else {
        setTimeout(() => navigate("/setup-profile"), 800);
      }
    } catch (err) {
      const errorMsg =
        err.response?.data || "Login failed. Please check your credentials.";
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-title">
          <FiLogIn className="auth-title-icon" />
          <h2>Welcome back</h2>
          <p className="auth-subtitle">Login to your Wellnest account</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <FiMail className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group password-group">
            <FiLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="eye-btn"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <div className="forgot-row">
            <button
              type="button"
              className="link-inline-btn"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <p className="auth-toggle">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
