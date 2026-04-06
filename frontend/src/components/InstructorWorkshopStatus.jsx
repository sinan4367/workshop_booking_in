import React, { useState } from 'react';
import './InstructorWorkshopStatus.css';

const InstructorWorkshopStatus = ({ user }) => {
  // Static data matching Django template structure
  const [acceptedWorkshops] = useState([
    {
      id: 1,
      coordinatorName: 'Jane Smith',
      institute: 'FOSSEE',
      workshopName: 'Python Programming',
      workshopDay: '2024-01-15',
      status: 'Accepted',
      date: new Date('2024-01-15'),
      today: new Date(),
      duration: '2 days',
      participants: 25
    },
    {
      id: 2,
      coordinatorName: 'John Doe',
      institute: 'IIT Bombay',
      workshopName: 'Data Science',
      workshopDay: '2024-01-20',
      status: 'Accepted',
      date: new Date('2024-01-20'),
      today: new Date(),
      duration: '3 days',
      participants: 30
    },
    {
      id: 3,
      coordinatorName: 'Alice Johnson',
      institute: 'MIT',
      workshopName: 'Machine Learning',
      workshopDay: '2024-02-01',
      status: 'Accepted',
      date: new Date('2024-02-01'),
      today: new Date(),
      duration: '4 days',
      participants: 35
    }
  ]);

  const [proposedWorkshops] = useState([
    {
      id: 4,
      coordinatorName: 'Bob Wilson',
      institute: 'Stanford',
      workshopName: 'Web Development',
      workshopDay: '2024-02-10',
      status: 'Pending',
      action: 'Accept',
      duration: '2 days',
      participants: 20
    },
    {
      id: 5,
      coordinatorName: 'Carol Davis',
      institute: 'Harvard',
      workshopName: 'Cloud Computing',
      workshopDay: '2024-02-15',
      status: 'Pending',
      action: 'Accept',
      duration: '3 days',
      participants: 25
    },
    {
      id: 6,
      coordinatorName: 'David Brown',
      institute: 'Oxford',
      workshopName: 'Cybersecurity',
      workshopDay: '2024-02-20',
      status: 'Pending',
      action: 'Accept',
      duration: '2 days',
      participants: 15
    }
  ]);

  const hasWorkshops = acceptedWorkshops.length > 0 || proposedWorkshops.length > 0;

  const handleAcceptWorkshop = (workshopId) => {
    alert(`Accepting workshop ${workshopId}. In production, this would submit to Django backend.`);
  };

  const handleChangeDate = (workshopId) => {
    alert(`Changing date for workshop ${workshopId}. In production, this would open date picker.`);
  };

  return (
    <div className="instructor-workshop-status">
      {hasWorkshops ? (
        <div className="workshop-container">
          <div className="page-header">
            <h1 className="page-title">The status of your workshops</h1>
            <p className="page-subtitle">Manage accepted workshops and review proposals</p>
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
                        <span className="info-label">Coordinator</span>
                        <span className="info-value">
                          <a href="#profile" className="coordinator-link">
                            {workshop.coordinatorName}
                          </a>
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Workshop Day</span>
                        <span className="info-value">
                          {workshop.workshopDay}
                          {workshop.date > workshop.today && (
                            <>
                              <span 
                                className="material-icons datepicker"
                                title="Click here to change date"
                                onClick={() => handleChangeDate(workshop.id)}
                              >
                                event
                              </span>
                            </>
                          )}
                        </span>
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

          {/* Workshops Proposed By Coordinators Section */}
          <div className="section">
            <h2 className="section-title">
              <span className="title-icon">⏳</span>
              Workshops Proposed By Coordinators
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
                        <span className="info-label">Coordinator</span>
                        <span className="info-value">
                          <a href="#profile" className="coordinator-link">
                            {workshop.coordinatorName}
                          </a>
                        </span>
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
                    <div className="action-section">
                      <button 
                        className="accept-btn"
                        onClick={() => {
                          if (window.confirm('Once accepted you cannot reject, you have to personally contact the Coordinator if the workshop is to be cancelled. Are you sure you want to accept the workshop?')) {
                            handleAcceptWorkshop(workshop.id);
                          }
                        }}
                      >
                        Accept Workshop
                      </button>
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

export default InstructorWorkshopStatus;
