import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiActivity, FiTrendingUp, FiTarget, FiLogOut } from "react-icons/fi";
import { fetchCurrentUser } from "../api/userApi";

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.clear();
    if (typeof onLogout === "function") {
      onLogout();
    }
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const loadUser = async () => {
      try {
        const res = await fetchCurrentUser();
        setUser(res.data);
      } catch {
        setError("Failed to load user. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-card">
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-card">
          <p>{error || "Something went wrong"}</p>
          <button className="secondary-btn" onClick={handleLogout}>
            Back to login
          </button>
        </div>
      </div>
    );
  }

  const friendlyRole =
    user.role === "ROLE_TRAINER"
      ? "Trainer"
      : user.role === "ROLE_ADMIN"
      ? "Admin"
      : "User";

  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <div>
            <h1>Hey, {user.name}</h1>
            <p className="dashboard-subtitle">
              Welcome to your smart health & fitness hub
            </p>
          </div>
          <button className="ghost-btn" onClick={handleLogout}>
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>

        <div className="dashboard-grid">
          <div className="dash-box">
            <div className="dash-box-icon">
              <FiActivity />
            </div>
            <h3>Body Snapshot</h3>
            <ul>
              <li>Age: {user.age ?? "–"}</li>
              <li>Weight: {user.weightKg ?? "–"} kg</li>
              <li>Height: {user.heightCm ?? "–"} cm</li>
            </ul>
          </div>

          <div className="dash-box">
            <div className="dash-box-icon">
              <FiTarget />
            </div>
            <h3>Your Goal</h3>
            <p>{user.fitnessGoal || "No goal set yet."}</p>
            <Link to="/profile" className="link-btn">
              View full profile
            </Link>
          </div>

          <div className="dash-box">
            <div className="dash-box-icon">
              <FiTrendingUp />
            </div>
            <h3>Next Steps</h3>
            <ul>
              <li>Log today’s workout</li>
              <li>Track meals & water</li>
              <li>Check BMI & health tips</li>
            </ul>
          </div>
        </div>

        <p className="role-pill">Logged in as {friendlyRole}</p>
      </div>
    </div>
  );
};

export default Dashboard;
