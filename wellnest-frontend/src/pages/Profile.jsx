// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiEdit2, FiMail, FiUser, FiPhone } from "react-icons/fi";
import { fetchCurrentUser } from "../api/userApi";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      try {
        const res = await fetchCurrentUser();
        if (!mounted) return;
        // If your API returns the user object in res.data, use that:
        setUser(res.data);
      } catch (err) {
        // show friendly error, but don't immediately redirect (ProtectedRoute handles auth)
        console.error("fetchCurrentUser error:", err);
        setError(
          err?.response?.data?.message ||
            "Failed to load profile. Please try again."
        );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadUser();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-card">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-card">
          <p style={{ color: "#f97373" }}>{error}</p>
          <button
            className="secondary-btn"
            onClick={() => {
              // try again or logout if you want
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Back to login
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-card">
          <p>No profile data available.</p>
          <Link to="/setup-profile" className="primary-btn">
            Complete Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1>{user.name || "Your Profile"}</h1>
            <p className="dashboard-subtitle">View and edit your profile details</p>
          </div>
          <div>
            <button
              className="ghost-btn"
              onClick={() => navigate("/setup-profile")}
              title="Edit profile"
            >
              <FiEdit2 />
              <span style={{ marginLeft: 8 }}>Edit</span>
            </button>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <div className="profile-section" style={{ marginBottom: 12 }}>
            <h3>Personal Info</h3>
            <p><FiUser style={{ marginRight: 8 }} /> <strong>Name:</strong> {user.name || "—"}</p>
            <p><FiMail style={{ marginRight: 8 }} /> <strong>Email:</strong> {user.email || "—"}</p>
            <p><FiPhone style={{ marginRight: 8 }} /> <strong>Phone:</strong> {user.phone || "—"}</p>
          </div>

          <div className="profile-section">
            <h3>Body Metrics</h3>
            <p><strong>Age:</strong> {user.age ?? "—"}</p>
            <p><strong>Weight:</strong> {user.weightKg ?? "—"} kg</p>
            <p><strong>Height:</strong> {user.heightCm ?? "—"} cm</p>
            <p><strong>Fitness goal:</strong> {user.fitnessGoal || "Not set"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
