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

   const [passwordStrength, setPasswordStrength] = useState({
  isValid: false,
  score: 0,
  feedback: []
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

    // Validate password strength when password changes
    if (name === "password") {
      const validation = validatePassword(value);
      setPasswordStrength(validation);
    }
  }
};


  const validatePassword = (password) => {
  const feedback = [];
  let score = 0;

  // Check length
  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push("At least 8 characters");
  }

  // Check uppercase
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("At least one uppercase letter");
  }

  // Check lowercase
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("At least one lowercase letter");
  }

  // Check numbers
  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push("At least one number");
  }

  // Check special characters
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
  } else {
    feedback.push("At least one special character (!@#$%^&*)");
  }

  const isValid = score >= 4; // Require at least 4 out of 5 criteria

  return {
    isValid,
    score,
    feedback
  };
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

  // 🛑 Password strength validation
  if (!passwordStrength.isValid && form.password) {
    setMessage("Please create a stronger password that meets all requirements.");
    setLoading(false);
    return;
  }

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
                    {/* Password Strength Indicator */}
          {form.password && (
            <div style={{ marginTop: "8px", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <span style={{ fontSize: "12px", color: "#9ca3af" }}>Password Strength:</span>
                <div style={{ display: "flex", gap: "2px" }}>
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      style={{
                        width: "20px",
                        height: "4px",
                        borderRadius: "2px",
                        backgroundColor: level <= passwordStrength.score 
                          ? passwordStrength.score <= 2 ? "#ef4444" 
                          : passwordStrength.score <= 3 ? "#f59e0b" 
                          : "#22c55e"
                          : "#374151"
                      }}
                    />
                  ))}
                </div>
                <span style={{ 
                  fontSize: "11px", 
                  color: passwordStrength.isValid ? "#22c55e" : "#ef4444",
                  fontWeight: "500"
                }}>
                  {passwordStrength.score <= 2 ? "Weak" 
                   : passwordStrength.score <= 3 ? "Medium" 
                   : "Strong"}
                </span>
              </div>
              
              {passwordStrength.feedback.length > 0 && (
                <div style={{ fontSize: "11px", color: "#ef4444" }}>
                  Missing: {passwordStrength.feedback.join(", ")}
                </div>
              )}
            </div>
          )}

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

          <button 
            type="submit" 
            className="primary-btn" 
            disabled={loading || (form.password && !passwordStrength.isValid)}
            style={{
              opacity: (loading || (form.password && !passwordStrength.isValid)) ? 0.6 : 1
            }}
          >
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
