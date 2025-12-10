// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

/**
 * Improved ProtectedRoute:
 * - rejects null/undefined/"undefined"/"" tokens
 * - optional JWT expiry check (uncomment if using JWT with exp)
 */
const isValidToken = (token) => {
  if (!token) return false;
  if (typeof token !== "string") return false;
  const t = token.trim();
  if (!t) return false;
  if (t === "undefined" || t === "null") return false;
  // Optional: check JWT expiry
  // try {
  //   const payload = JSON.parse(atob(t.split('.')[1]));
  //   if (payload.exp && Date.now() >= payload.exp * 1000) return false;
  // } catch (e) { /* not a JWT or invalid - skip expiry check */ }
  return true;
};

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!isValidToken(token)) {
    // Helpful debug log (remove in production)
    // eslint-disable-next-line no-console
    console.warn("ProtectedRoute: no valid token, redirecting to login. token:", token);
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
