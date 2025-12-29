import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const isValidToken = (token) => {
  if (!token) return false;
  if (typeof token !== "string") return false;
  const t = token.trim();
  if (!t) return false;
  if (t === "undefined" || t === "null") return false;
  // Check JWT expiry
  try {
    const parts = t.split('.');
    if (parts.length !== 3) return true; // Not a JWT, skip check
    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      console.warn("Token expired");
      return false;
    }
  } catch (e) {
    /* not a valid JWT or atob failed - skip expiry check */
  }
  return true;
};

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!isValidToken(token)) {
    // eslint-disable-next-line no-console
    console.warn("ProtectedRoute: invalid or missing token — redirecting to login.", { token });

    // Optional: clear obviously-bad token to avoid repeated redirects
    if (token) {
      try {
        // only remove tokens that are clearly not usable
        if (token === "undefined" || token === "null") {
          localStorage.removeItem("token");
        } else if (isProbablyJwt(token)) {
          // if JWT and expired, remove it
          try {
            const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
            if (payload && payload.exp && Date.now() >= payload.exp * 1000) {
              localStorage.removeItem("token");
            }
          } catch (_) {
            // ignore parse errors
          }
        }
      } catch (_) {
        // ignore any storage errors
      }
    }

    // Optional hook (global) for apps that want to run extra cleanup
    try {
      if (typeof window.onAuthFail === "function") window.onAuthFail();
    } catch (e) {
      /* ignore */
    }

    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
