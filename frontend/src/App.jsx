import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import WorkshopStatistics from "./components/WorkshopStatistics";
import "./App.css";

const App = () => {
  // State for current view: 'login', 'register', 'dashboard', 'statistics'
  const [currentView, setCurrentView] = useState("login");
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("/");

  // Check for existing session on mount (simulated)
  useEffect(() => {
    const savedUser = localStorage.getItem("fossee_user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setCurrentView("dashboard");
      } catch (e) {
        localStorage.removeItem("fossee_user");
      }
    }
  }, []);

  // Handle login
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("fossee_user", JSON.stringify(userData));
    setCurrentView("dashboard");
    setCurrentPage("/");
  };

  // Handle registration
  const handleRegister = (userData) => {
    setUser(userData);
    localStorage.setItem("fossee_user", JSON.stringify(userData));
    setCurrentView("dashboard");
    setCurrentPage("/");
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("fossee_user");
    setCurrentView("login");
    setCurrentPage("/");
  };

  // Handle navigation (for demo purposes)
  const handleNavigate = (path) => {
    setCurrentPage(path);
    // Switch to dashboard view when navigating to other pages
    if (currentView === "login" || currentView === "register") {
      if (user) {
        setCurrentView("dashboard");
      }
    }
    // Navigate to statistics page
    if (path === "/statistics/public") {
      setCurrentView("statistics");
    }
  };

  // Render login page
  if (currentView === "login") {
    return (
      <div className="app-container">
        <Navbar
          user={user}
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
        <LoginForm
          onLogin={handleLogin}
          onSwitchToRegister={() => setCurrentView("register")}
        />
      </div>
    );
  }

  // Render registration page
  if (currentView === "register") {
    return (
      <div className="app-container">
        <Navbar
          user={user}
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
        <RegisterForm
          onRegister={handleRegister}
          onSwitchToLogin={() => setCurrentView("login")}
        />
      </div>
    );
  }

  // Render statistics page
  if (currentView === "statistics") {
    return (
      <div className="app-container">
        <Navbar
          user={user}
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
        <main className="main-content">
          <WorkshopStatistics />
        </main>
      </div>
    );
  }

  // Render dashboard (authenticated views)
  return (
    <div className="app-container">
      <Navbar
        user={user}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {/* Back to Dashboard button */}
          <button
            onClick={() => setCurrentPage("/")}
            className="mb-4 inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Dashboard
          </button>

          {/* Welcome Card */}
          <div className="welcome-card">
            <div className="welcome-header">
              <div className="welcome-avatar">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="welcome-info">
                <h1 className="welcome-title">Welcome, {user?.name}!</h1>
                <p className="welcome-role">
                  {user?.role === "instructor"
                    ? "Instructor Dashboard"
                    : "Coordinator Dashboard"}
                </p>
              </div>
            </div>
            <p className="welcome-description">
              {user?.role === "instructor"
                ? "Manage your workshops, view team statistics, and conduct training sessions."
                : "Propose new workshops, track their status, and coordinate with instructors."}
            </p>
          </div>

          {/* Dashboard Grid */}
          <div className="dashboard-grid">
            {/* Common Cards */}
            <div
              className="dashboard-card"
              onClick={() => handleNavigate("/workshop/status")}
            >
              <div className="card-icon blue">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h3 className="card-title">Workshop Status</h3>
              <p className="card-description">
                View the status of all workshops you are involved with
              </p>
            </div>

            <div
              className="dashboard-card"
              onClick={() => handleNavigate("/workshop/types")}
            >
              <div className="card-icon green">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 7V4h16v3"></path>
                  <path d="M9 20h6"></path>
                  <path d="M12 4v16"></path>
                </svg>
              </div>
              <h3 className="card-title">Workshop Types</h3>
              <p className="card-description">
                Browse available workshop types and categories
              </p>
            </div>

            <div
              className="dashboard-card"
              onClick={() => handleNavigate("/statistics/public")}
            >
              <div className="card-icon purple">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
              </div>
              <h3 className="card-title">Statistics</h3>
              <p className="card-description">
                View public workshop statistics and analytics
              </p>
            </div>

            {/* Role-Specific Cards */}
            {user?.role === "instructor" && (
              <div
                className="dashboard-card"
                onClick={() => handleNavigate("/statistics/team")}
              >
                <div className="card-icon orange">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="card-title">Team Statistics</h3>
                <p className="card-description">
                  View team performance and analytics
                </p>
              </div>
            )}

            {user?.role === "coordinator" && (
              <div
                className="dashboard-card"
                onClick={() => handleNavigate("/workshop/propose")}
              >
                <div className="card-icon teal">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </div>
                <h3 className="card-title">Propose Workshop</h3>
                <p className="card-description">
                  Submit a new workshop proposal
                </p>
              </div>
            )}
          </div>

          {/* User Info Card */}
          <div className="info-card">
            <h3 className="info-title">Account Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Name</span>
                <span className="info-value">{user?.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Username</span>
                <span className="info-value">{user?.username}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Role</span>
                <span className="info-value badge">
                  {user?.role === "instructor" ? "Instructor" : "Coordinator"}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Email</span>
                <span className="info-value">
                  {user?.email || "Not provided"}
                </span>
              </div>
            </div>
          </div>

          {/* Demo Notice */}
          <div className="demo-notice">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>
              This is a demo. In production, this would connect to the Django
              backend.
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
