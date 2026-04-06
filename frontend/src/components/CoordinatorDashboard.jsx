import React from 'react';
import './CoordinatorDashboard.css';

const CoordinatorDashboard = ({ user, onNavigate }) => {
  return (
    <div className="dashboard">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h1 className="welcome-title">
          Welcome, {user?.name || 'User'} 
        </h1>
        <p className="welcome-subtitle">
          Manage your workshops and track their progress
        </p>
      </div>

      {/* Main Cards */}
      <div className="cards">
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

        {/* Workshop Status Card */}
        <div className="card">
          <h2 className="card-title">
            Workshop Status
          </h2>
          <p className="card-description">
            Track status of your proposals
          </p>
          <button className="card-button" onClick={() => onNavigate('/workshop/status')}>
            View Status
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

        {/* Statistics Card */}
        <div className="card">
          <h2 className="card-title">
            Statistics
          </h2>
          <p className="card-description">
            View public workshop statistics
          </p>
          <button className="card-button" onClick={() => onNavigate('/statistics/public')}>
            View Statistics
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorDashboard;
