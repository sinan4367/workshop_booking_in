import React from 'react';
import './WorkshopCard.css';

const WorkshopCard = ({ workshop, getStatusColor }) => {
  const statusColor = getStatusColor(workshop.status);

  return (
    <div className="workshop-card">
      <div className="card-header">
        <h3 className="workshop-name">
          {workshop.workshopType}
        </h3>
        <span 
          className="status-badge"
          style={{ backgroundColor: statusColor }}
        >
          {workshop.status}
        </span>
      </div>

      <div className="card-content">
        {workshop.instructorName && (
          <div className="info-row">
            <span className="info-label">Instructor:</span>
            <span className="info-value">{workshop.instructorName}</span>
          </div>
        )}
        
        <div className="info-row">
          <span className="info-label">Date:</span>
          <span className="info-value">{workshop.date}</span>
        </div>

        {workshop.status === 'Accepted' && workshop.instructorName && (
          <div className="card-actions">
            <button className="view-details-btn">
              View Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkshopCard;
