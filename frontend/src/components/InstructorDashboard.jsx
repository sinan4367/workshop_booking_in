import React from 'react';
import './InstructorDashboard.css';

const InstructorDashboard = ({ user, onNavigate }) => {
  return (
    <div className="dashboard">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h1 className="welcome-title">
          Welcome, {user?.name || 'User'} 
        </h1>
        <p className="welcome-subtitle">
          Manage your workshops and track team performance
        </p>
      </div>

      {/* Main Cards */}
      <div className="cards">
        {/* Workshop Status Card - Primary */}
        <div className="card">
          <h2 className="card-title">
            Workshop Status
          </h2>
          <p className="card-description">
            View your accepted workshops and review proposals
          </p>
          <button className="card-button" onClick={() => onNavigate('/workshop/status')}>
            View Status
          </button>
        </div>

        {/* Team Statistics Card - Secondary */}
        <div className="card">
          <h2 className="card-title">
            Team Statistics
          </h2>
          <p className="card-description">
            Track team performance and analytics
          </p>
          <button className="card-button" onClick={() => onNavigate('/statistics/team')}>
            View Statistics
          </button>
        </div>

        {/* Propose Workshop Card */}
        <div className="card">
          <h2 className="card-title">
            Propose Workshop
          </h2>
          <p className="card-description">
            Submit a new workshop request
          </p>
          <button className="card-button" onClick={() => onNavigate('/workshop/propose')}>
            + Propose Workshop
          </button>
        </div>

        {/* Workshop Types Card */}
        <div className="card">
          <h2 className="card-title">
            Workshop Types
          </h2>
          <p className="card-description">
            Browse available workshop types
          </p>
          <button className="card-button" onClick={() => onNavigate('/workshop/types')}>
            Browse Types
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
