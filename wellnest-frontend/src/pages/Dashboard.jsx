import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiActivity, FiTrendingUp, FiTarget, FiLogOut } from "react-icons/fi";
import { fetchCurrentUser } from "../api/userApi";
import { FiSun } from "react-icons/fi";


const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [healthTip, setHealthTip] = useState("");
  const [tipLoading, setTipLoading] = useState(true);
  const [tipBackground, setTipBackground] = useState("");


  const handleLogout = () => {
    localStorage.clear();
    if (typeof onLogout === "function") {
      onLogout();
    }
    navigate("/");
  };

    const getHealthTipBackground = (tip) => {
    const tipLower = tip.toLowerCase();
    
    // Determine category based on keywords in the tip
    if (tipLower.includes("water") || tipLower.includes("hydrat")) {
      return "https://unsplash.com/photos/person-holding-stainless-steel-cup-ZRSw-2dOMU8"; // Water/hydration
    } else if (tipLower.includes("sleep") || tipLower.includes("rest")) {
      return "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80"; // Sleep/rest
    } else if (tipLower.includes("fruit") || tipLower.includes("vegetable") || tipLower.includes("nutrition") || tipLower.includes("diet")) {
      return "https://unsplash.com/photos/a-close-up-of-a-berry-on-a-tree-branch-L34evDsQBuc"; // Fruits/vegetables
    } else if (tipLower.includes("exercise") || tipLower.includes("workout") || tipLower.includes("fitness") || tipLower.includes("walk")) {
      return "https://unsplash.com/photos/a-woman-is-doing-exercises-with-dumbbells-8QIkNwjcnck"; // Exercise/fitness
    } else if (tipLower.includes("stress") || tipLower.includes("meditation") || tipLower.includes("yoga") || tipLower.includes("relax")) {
      return "https://unsplash.com/photos/person-in-blue-shorts-sitting-on-beach-shore-during-daytime-n8L1VYaypcw"; // Meditation/yoga
    } else if (tipLower.includes("protein") || tipLower.includes("muscle")) {
      return "https://unsplash.com/photos/woman-lifting-barbell-jO6vBWX9h9Y"; // Protein/muscle
    } else if (tipLower.includes("posture") || tipLower.includes("stretch")) {
      return "https://unsplash.com/photos/woman-in-black-sports-bra-and-black-and-white-skirt-sitting-on-white-and-black-textile-D35YLlQybF4"; // Stretching/posture
    } else if (tipLower.includes("sun") || tipLower.includes("skin")) {
      return "https://unsplash.com/photos/white-and-blue-cloudy-sky-TSgwbumanuE"; // Sun/outdoor
    } else {
      return "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80"; // General health/wellness
    }
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

    useEffect(() => {
    const fetchHealthTip = async () => {
      // Check if we have a cached tip and if it's still valid for today
      const cachedTip = localStorage.getItem('dailyHealthTip');
      const cachedDate = localStorage.getItem('healthTipDate');
      const cachedBackground = localStorage.getItem('healthTipBackground');
      const today = new Date().toDateString(); // Gets date like "Mon Dec 09 2024"

      // If we have a cached tip from today, use it
      if (cachedTip && cachedDate === today && cachedBackground) {
        setHealthTip(cachedTip);
        setTipBackground(cachedBackground);
        setTipLoading(false);
        return;
      }

      // Otherwise, fetch a new tip
      try {
        // Using health tips API from health-api (free, no key required)
        const response = await fetch("https://health-tips-api1.p.rapidapi.com/", {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "SIGN-UP-FOR-KEY",
            "X-RapidAPI-Host": "health-tips-api1.p.rapidapi.com"
          }
        });
        
        if (!response.ok) {
          throw new Error("API failed");
        }
        
        const data = await response.json();
        if (data && data.tip) {
          const newTip = data.tip;
          const newBackground = getHealthTipBackground(newTip);
          
          setHealthTip(newTip);
          setTipBackground(newBackground);
          
          // Cache the tip, date, and background for today
          localStorage.setItem('dailyHealthTip', newTip);
          localStorage.setItem('healthTipDate', today);
          localStorage.setItem('healthTipBackground', newBackground);
        } else {
          throw new Error("No tip in response");
        }
      } catch (error) {
        // Fallback to curated health tips if API fails
        const healthTips = [
          "Drink at least 8 glasses of water daily to stay hydrated and support bodily functions.",
          "Aim for 7-9 hours of quality sleep each night for optimal physical and mental health.",
          "Include a variety of colorful fruits and vegetables in your diet for essential nutrients.",
          "Exercise for at least 30 minutes daily to maintain cardiovascular health.",
          "Practice stress management through meditation, deep breathing, or yoga.",
          "Limit processed foods and added sugars to reduce risk of chronic diseases.",
          "Take regular breaks from sitting - stand and stretch every hour.",
          "Maintain good posture to prevent back and neck pain.",
          "Wash your hands frequently to prevent the spread of infections.",
          "Schedule regular health check-ups and screenings with your doctor.",
          "Limit alcohol consumption and avoid smoking for better health.",
          "Stay socially connected with friends and family for mental well-being.",
          "Protect your skin from sun damage by using sunscreen daily.",
          "Practice portion control to maintain a healthy weight.",
          "Include lean proteins in your meals to support muscle health."
        ];
        
        // Use date as seed for consistent daily tip selection
        const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
        const tipIndex = dayOfYear % healthTips.length;
        const newTip = healthTips[tipIndex];
        const newBackground = getHealthTipBackground(newTip);
        
        setHealthTip(newTip);
        setTipBackground(newBackground);
        
        // Cache the fallback tip for today
        localStorage.setItem('dailyHealthTip', newTip);
        localStorage.setItem('healthTipDate', today);
        localStorage.setItem('healthTipBackground', newBackground);
      } finally {
        setTipLoading(false);
      }
    };

    fetchHealthTip();
  }, []);



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
            <h3>BMI Calculator</h3>
            <p>Calculate your Body Mass Index and check your health status</p>
            <Link to="/bmi-calculator" className="link-btn">
              Calculate BMI
            </Link>
          </div>

        </div>

       <p className="role-pill">Logged in as {friendlyRole}</p>
      </div>

            {/* Daily Health Tip Card - Separate card below main dashboard */}
      <div 
        className="dashboard-card" 
        style={{ 
          marginTop: "20px",
          minHeight: "280px",
          backgroundImage: tipBackground ? `url(${tipBackground})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Top section with title */}
        <div 
          className="dashboard-header" 
          style={{ 
            marginBottom: "0",
            padding: "20px 26px 20px"
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <FiSun style={{ 
                color: "#fbbf24", 
                fontSize: "28px",
                filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 1))"
              }} />
              <h2 style={{ 
                margin: 0,
                textShadow: "0 2px 8px rgba(0, 0, 0, 1), 0 0 20px rgba(0, 0, 0, 0.8)",
                fontSize: "24px",
                color: "#ffffff",
                fontWeight: "700"
              }}>Daily Health Tip</h2>
            </div>
            <p className="dashboard-subtitle" style={{
              textShadow: "0 2px 6px rgba(0, 0, 0, 1), 0 0 15px rgba(0, 0, 0, 0.8)",
              color: "#f1f5f9",
              fontWeight: "500"
            }}>Your wellness tip for today</p>
          </div>
        </div>

        {/* Bottom section with tip text  */}
        <div style={{ 
          padding: "30px 26px",
          marginTop: "auto"
        }}>
          {tipLoading ? (
            <p style={{ 
              textAlign: "center", 
              fontSize: "16px", 
              color: "#ffffff",
              textShadow: "0 2px 8px rgba(0, 0, 0, 1), 0 0 20px rgba(0, 0, 0, 0.8)",
              fontWeight: "600"
            }}>Loading health tip...</p>
          ) : (
            <p style={{ 
              fontSize: "18px", 
              lineHeight: "1.8", 
              fontStyle: "italic",
              textShadow: "0 2px 10px rgba(0, 0, 0, 1), 0 0 25px rgba(0, 0, 0, 0.9)",
              fontWeight: "600",
              margin: 0,
              color: "#ffffff"
            }}>
              💡 {healthTip}
            </p>
          )}
        </div>
      </div>


    </div>

  );
};

export default Dashboard;
