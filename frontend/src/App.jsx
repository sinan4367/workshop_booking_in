import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import WorkshopStatistics from "./components/WorkshopStatistics";
import TeamStatistics from "./components/TeamStatistics";
import WorkshopTypes from "./components/WorkshopTypes";
import CoordinatorDashboard from "./components/CoordinatorDashboard";
import InstructorDashboard from "./components/InstructorDashboard";
import CoordinatorWorkshopStatus from "./components/CoordinatorWorkshopStatus";
import InstructorWorkshopStatus from "./components/InstructorWorkshopStatus";
import WorkshopProposal from "./components/WorkshopProposal";
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
    // Navigate to team statistics page
    if (path === "/statistics/team") {
      setCurrentView("team-statistics");
    }
    // Navigate to workshop status page
    if (path === "/workshop/status") {
      setCurrentView("workshop-status");
    }
    // Navigate to workshop types page
    if (path === "/workshop/types") {
      setCurrentView("workshop-types");
    }
    // Navigate to workshop proposal page
    if (path === "/workshop/propose") {
      setCurrentView("workshop-proposal");
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
        <main className="main-content">
          <LoginForm
            onLogin={handleLogin}
            onSwitchToRegister={() => setCurrentView("register")}
          />
        </main>
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
        <main className="main-content">
          <RegisterForm
            onRegister={handleRegister}
            onSwitchToLogin={() => setCurrentView("login")}
          />
        </main>
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

  // Render team statistics page
  if (currentView === "team-statistics") {
    return (
      <div className="app-container">
        <Navbar
          user={user}
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
        <main className="main-content">
          <TeamStatistics />
        </main>
      </div>
    );
  }

  // Render workshop status page
    if (currentView === "workshop-status") {
    return (
      <div className="app-container">
        <Navbar
          user={user}
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
        <main className="main-content">
          {user?.role === "instructor" ? (
            <InstructorWorkshopStatus user={user} />
          ) : (
            <CoordinatorWorkshopStatus user={user} />
          )}
        </main>
      </div>
    );
  }

  // Render workshop proposal page
  if (currentView === "workshop-proposal") {
    return (
      <div className="app-container">
        <Navbar
          user={user}
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
        <main className="main-content">
          <WorkshopProposal user={user} />
        </main>
      </div>
    );
  }

  // Render workshop types page
    if (currentView === "workshop-types") {
    return (
      <div className="app-container">
        <Navbar
          user={user}
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
        <main className="main-content">
          <WorkshopTypes user={user} />
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
          {user?.role === "instructor" ? (
            <InstructorDashboard user={user} onNavigate={handleNavigate} />
          ) : (
            <CoordinatorDashboard user={user} onNavigate={handleNavigate} />
          )}
        </main>
      </div>
    );
};

export default App;
