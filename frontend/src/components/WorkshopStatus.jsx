import React, { useState } from 'react';
import './WorkshopStatus.css';

const WorkshopStatus = () => {
  const [user] = useState({
    firstName: 'John',
    isAuthenticated: true
  });

  // Mock data for workshops
  const mockWorkshops = {
    accepted: [
      {
        id: 1,
        workshopType: 'Python Programming',
        instructorName: 'Dr. Sarah Johnson',
        date: '2024-01-15',
        status: 'Accepted'
      },
      {
        id: 2,
        workshopType: 'Data Science Basics',
        instructorName: 'Prof. Michael Chen',
        date: '2024-01-20',
        status: 'Accepted'
      },
      {
        id: 3,
        workshopType: 'Machine Learning',
        instructorName: 'Dr. Lisa Anderson',
        date: '2024-01-25',
        status: 'Accepted'
      }
    ],
    proposed: [
      {
        id: 4,
        workshopType: 'Web Development',
        date: '2024-02-01',
        status: 'Pending'
      },
      {
        id: 5,
        workshopType: 'Cloud Computing',
        date: '2024-02-05',
        status: 'Pending'
      },
      {
        id: 6,
        workshopType: 'Cybersecurity',
        date: '2024-02-10',
        status: 'Pending'
      }
    ]
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Accepted':
        return 'badge-success';
      case 'Pending':
        return 'badge-warning';
      default:
        return 'badge-secondary';
    }
  };

  const hasWorkshops = mockWorkshops.accepted.length > 0 || mockWorkshops.proposed.length > 0;

  return (
    <div className="workshop-status-page">
      {/* Welcome Message for Empty State */}
      {!hasWorkshops && (
        <div className="container">
          <div className="jumbotron">
            <h1>Welcome {user.firstName}</h1>
            <p>
              Information related to your workshops will be shown here, you can also 
              propose a workshop as per your available date in <strong>Propose Workshop tab</strong>.
            </p>
          </div>
        </div>
      )}

      {/* Workshop Status Header */}
      {hasWorkshops && (
        <h3 className="text-center table-heading">
          <strong>The status of your workshops</strong>
        </h3>
      )}

      <br />

      {/* Accepted Workshops Table */}
      {mockWorkshops.accepted.length > 0 && (
        <div className="container">
          <h3 className="text-center table-heading">
            <strong>Workshops Accepted</strong>
          </h3>
          <table className="table table-striped table-responsive-sm">
            <thead>
              <tr>
                <th>Workshop Name</th>
                <th>Instructor Name</th>
                <th>Workshop Day</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockWorkshops.accepted.map((workshop) => (
                <tr key={workshop.id}>
                  <td>
                    <a href={`/workshop-details/${workshop.id}`}>
                      {workshop.workshopType}
                    </a>
                  </td>
                  <td>{workshop.instructorName}</td>
                  <td>{workshop.date}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(workshop.status)}`}>
                      {workshop.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Proposed Workshops Table */}
      {mockWorkshops.proposed.length > 0 && (
        <div className="container">
          <h3 className="text-center table-heading">
            <strong>Workshops Proposed By Me</strong>
          </h3>
          <table className="table table-striped table-responsive-sm">
            <thead>
              <tr>
                <th>Workshop Name</th>
                <th>Workshop Day</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockWorkshops.proposed.map((workshop) => (
                <tr key={workshop.id}>
                  <td>
                    <a href={`/workshop-details/${workshop.id}`}>
                      {workshop.workshopType}
                    </a>
                  </td>
                  <td>{workshop.date}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(workshop.status)}`}>
                      {workshop.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WorkshopStatus;
