import React, { useState } from 'react';
import './CoordinatorWorkshopStatus.css';

const CoordinatorWorkshopStatus = ({ user }) => {
  // Static data matching Django template structure
  const [acceptedWorkshops] = useState([
    {
      id: 1,
      workshopName: 'Python Programming',
      instructorName: 'Dr. Sarah Johnson',
      workshopDay: '2024-01-15',
      status: 'Accepted',
      institute: 'FOSSEE',
      duration: '2 days',
      participants: 25
    },
    {
      id: 2,
      workshopName: 'Data Science Basics',
      instructorName: 'Prof. Michael Chen',
      workshopDay: '2024-01-20',
      status: 'Accepted',
      institute: 'IIT Bombay',
      duration: '3 days',
      participants: 30
    },
    {
      id: 3,
      workshopName: 'Machine Learning',
      instructorName: 'Dr. Emily Davis',
      workshopDay: '2024-02-01',
      status: 'Accepted',
      institute: 'MIT',
      duration: '4 days',
      participants: 35
    }
  ]);

  const [proposedWorkshops] = useState([
    {
      id: 4,
      workshopName: 'Web Development',
      instructorName: 'Not Assigned',
      workshopDay: '2024-02-10',
      status: 'Pending',
      institute: 'Stanford',
      duration: '2 days',
      participants: 20
    },
    {
      id: 5,
      workshopName: 'Cloud Computing',
      instructorName: 'Not Assigned',
      workshopDay: '2024-02-15',
      status: 'Pending',
      institute: 'Harvard',
      duration: '3 days',
      participants: 25
    },
    {
      id: 6,
      workshopName: 'Cybersecurity',
      instructorName: 'Not Assigned',
      workshopDay: '2024-02-20',
      status: 'Pending',
      institute: 'Oxford',
      duration: '2 days',
      participants: 15
    }
  ]);

  const hasWorkshops = acceptedWorkshops.length > 0 || proposedWorkshops.length > 0;

  return (
    <div className="coordinator-workshop-status">
      {hasWorkshops ? (
        <div className="workshop-container">
          <div className="page-header">
            <h1 className="page-title">Workshop Status</h1>
            <p className="page-subtitle">Track the status of your workshop proposals</p>
          </div>

          {/* Workshops Accepted Section */}
          <div className="section">
            <h2 className="section-title">
              <span className="title-icon">✅</span>
              Workshops Accepted
            </h2>
            <div className="workshop-grid">
              {acceptedWorkshops.map((workshop) => (
                <div key={workshop.id} className="workshop-card accepted">
                  <div className="card-header">
                    <div className="workshop-info">
                      <h3 className="workshop-name">{workshop.workshopName}</h3>
                      <div className="workshop-meta">
                        <span className="institute">{workshop.institute}</span>
                        <span className="duration">{workshop.duration}</span>
                      </div>
                    </div>
                    <div className="status-badge accepted">
                      {workshop.status}
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Instructor</span>
                        <span className="info-value">{workshop.instructorName}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Workshop Day</span>
                        <span className="info-value">{workshop.workshopDay}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Participants</span>
                        <span className="info-value">{workshop.participants}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Workshops Proposed By Me Section */}
          <div className="section">
            <h2 className="section-title">
              <span className="title-icon">⏳</span>
              Workshops Proposed By Me
            </h2>
            <div className="workshop-grid">
              {proposedWorkshops.map((workshop) => (
                <div key={workshop.id} className="workshop-card pending">
                  <div className="card-header">
                    <div className="workshop-info">
                      <h3 className="workshop-name">{workshop.workshopName}</h3>
                      <div className="workshop-meta">
                        <span className="institute">{workshop.institute}</span>
                        <span className="duration">{workshop.duration}</span>
                      </div>
                    </div>
                    <div className="status-badge pending">
                      {workshop.status}
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Instructor</span>
                        <span className="info-value">{workshop.instructorName}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Workshop Day</span>
                        <span className="info-value">{workshop.workshopDay}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Participants</span>
                        <span className="info-value">{workshop.participants}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Welcome Flash Card - Empty State */
        <div className="empty-state-container">
          <div className="welcome-flash-card">
            <div className="card-icon">👋</div>
            <h1 className="welcome-title">Welcome {user?.firstName || user?.name}</h1>
            <p className="welcome-message">
              Your workshop related information will be shown here. Please navigate to <strong>Workshop list</strong> and
              depending upon your expertise and availability create a workshop by going to
              <strong>Create Workshop</strong>.
            </p>
            <div className="action-buttons">
              <button className="primary-btn">Browse Workshops</button>
              <button className="secondary-btn">Create Workshop</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoordinatorWorkshopStatus;
