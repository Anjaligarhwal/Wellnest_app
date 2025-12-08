import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUserPlus,
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import apiClient from "../api/apiClient";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const [confirmPassword, setConfirmPassword] = useState(""); // 🔁 NEW
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false); // 👁️ NEW
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 👁️ NEW

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    // 🛑 Password match validation
    if (form.password !== confirmPassword) {
      setMessage("Password and Confirm Password do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await apiClient.post("/auth/register", form);
      setMessage(res.data || "Registered successfully");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      const errorMsg =
        err.response?.data || "Registration failed. Please try again.";
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-title">
          <FiUserPlus className="auth-title-icon" />
          <h2>Create account</h2>
          <p className="auth-subtitle">Start your Wellnest journey</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <FiUser className="input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

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

          <div className="input-group password-group">
            <FiLock className="input-icon" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="eye-btn"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <div className="role-row">
            <label>Role:</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="role-select"
            >
              <option value="USER">User</option>
              <option value="TRAINER">Trainer</option>
            </select>
          </div>

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <p className="auth-toggle">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
