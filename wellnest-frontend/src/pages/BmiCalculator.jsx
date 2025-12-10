import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiActivity, FiArrowLeft } from "react-icons/fi";

const BmiCalculator = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    heightCm: "",
    weightKg: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const calculateBMI = (e) => {
    e.preventDefault();

    const height = parseFloat(formData.heightCm);
    const weight = parseFloat(formData.weightKg);

    if (height <= 0 || weight <= 0) {
      setResult({
        bmi: 0,
        category: "Invalid",
        message: "Please enter valid height and weight values.",
      });
      return;
    }

    // BMI = weight (kg) / (height (m))^2
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const bmiRounded = bmi.toFixed(2);

    let category = "";
    let message = "";

    if (bmi < 18.5) {
      category = "Underweight";
      message = "You are underweight. Consider consulting a nutritionist.";
    } else if (bmi >= 18.5 && bmi < 25) {
      category = "Normal";
      message = "You have a healthy weight. Keep it up!";
    } else if (bmi >= 25 && bmi < 30) {
      category = "Overweight";
      message = "You are overweight. Consider a balanced diet and exercise.";
    } else {
      category = "Obese";
      message = "You are obese. Please consult a healthcare professional.";
    }

    setResult({
      bmi: bmiRounded,
      category,
      message,
    });
  };

  return (
    <div className="setup-page">
      <div className="setup-card">
        <div className="setup-title">
          <FiActivity className="setup-title-icon" />
          <h2>BMI Calculator</h2>
          <p className="setup-subtitle">Calculate your Body Mass Index</p>
        </div>

        <form className="setup-form" onSubmit={calculateBMI}>
          <div className="input-group">
            <FiActivity className="input-icon" />
            <input
              type="number"
              name="heightCm"
              placeholder="Height (cm)"
              value={formData.heightCm}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FiActivity className="input-icon" />
            <input
              type="number"
              name="weightKg"
              placeholder="Weight (kg)"
              value={formData.weightKg}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="primary-btn">
            Calculate BMI
          </button>
        </form>

        {result && (
          <div className="bmi-result">
            <h3>Your BMI: {result.bmi}</h3>
            <p className="bmi-category">Category: {result.category}</p>
            <p className="bmi-message">{result.message}</p>
          </div>
        )}

        <button className="secondary-btn" onClick={() => navigate("/dashboard")}>
          <FiArrowLeft />
          <span>Back to Dashboard</span>
        </button>
      </div>
    </div>
  );
};

export default BmiCalculator;
