import React, { useState } from "react";
import "./AuthForms.css";
import ForgotPassword from "./ForgotPassword";

const LoginForm = ({ onLogin, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Demo: Check for demo credentials
    // In real Django integration, this would call the backend API
    if (
      formData.username === "coordinator" &&
      formData.password === "demo123"
    ) {
      onLogin({
        isAuthenticated: true,
        role: "coordinator",
        position: "coordinator",
        name: "Jane Smith",
        username: "coordinator",
      });
    } else if (
      formData.username === "instructor" &&
      formData.password === "demo123"
    ) {
      onLogin({
        isAuthenticated: true,
        role: "instructor",
        position: "instructor",
        name: "Dr. John Doe",
        username: "instructor",
      });
    } else {
      setErrors({
        nonField:
          "Invalid username or password. Try 'coordinator'/'demo123' or 'instructor'/'demo123'",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="auth-container">
      {showForgotPassword ? (
        <ForgotPassword onBackToLogin={handleBackToLogin} />
      ) : (
        <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              className="logo-icon"
            >
              <path
                d="M12 2L2 7l10 5 10-5-10-5z"
                fill="currentColor"
                opacity="0.9"
              />
              <path
                d="M2 17l10 5 10-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12l10 5 10-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to FOSSEE Workshops Portal</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {errors.nonField && (
            <div className="error-message non-field">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{errors.nonField}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={`form-input ${errors.username ? "input-error" : ""}`}
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
            />
            {errors.username && (
              <span className="field-error">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-input ${errors.password ? "input-error" : ""}`}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            {errors.password && (
              <span className="field-error">{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            className={`btn-primary auth-submit ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
            aria-disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <div className="auth-divider">
            <span>or</span>
          </div>
          <p className="auth-switch">
            New around here?{" "}
            <button
              type="button"
              className="auth-link"
              onClick={onSwitchToRegister}
            >
              Sign up
            </button>
          </p>
          <p className="auth-switch">
            <button 
              type="button" 
              className="auth-link"
              onClick={handleForgotPassword}
            >
              Forgot password?
            </button>
          </p>
        </div>

        {/* Demo Credentials Info */}
        <div className="demo-credentials">
          <p className="demo-title">Demo Credentials:</p>
          <div className="demo-info">
            <code>coordinator / demo123</code> - Coordinator account
          </div>
          <div className="demo-info">
            <code>instructor / demo123</code> - Instructor account
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
