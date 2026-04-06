import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [user] = useState({
    firstName: 'John',
    isAuthenticated: true
  });

  return (
    <div className="dashboard-container">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h1 className="welcome-title">
          Welcome, {user.firstName}! 
        </h1>
        <p className="welcome-subtitle">
          Manage your workshops and track their status
        </p>
      </div>

      {/* Primary Action Card */}
      <div className="action-card">
        <h2 className="action-title">
          Propose a Workshop
        </h2>
        <p className="action-description">
          Submit a new workshop request for your institution
        </p>
        <button className="primary-btn">
          + Propose Workshop
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
