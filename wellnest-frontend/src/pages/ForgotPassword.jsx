import React, { useState } from "react";
import apiClient from "../api/apiClient";
import { FiMail } from "react-icons/fi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await apiClient.post(
        `/auth/forgot-password?email=${encodeURIComponent(email)}`
      );
      setMessage(res.data || "If this email exists, a reset link has been sent.");
    } catch (err) {
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-title">
          <h2>Forgot password</h2>
          <p className="auth-subtitle">
            Enter your registered email to receive a reset link
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <FiMail className="input-icon" />
            <input
              type="email"
              placeholder="Registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="primary-btn">
            Send reset link
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
