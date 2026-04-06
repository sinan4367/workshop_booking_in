import React, { useState } from 'react';
import './WorkshopStatus.css';

const WorkshopStatus = ({ user }) => {
  // Mock data for instructor workshops
  const [acceptedWorkshops] = useState([
    {
      id: 1,
      coordinatorName: 'Jane Smith',
      institute: 'FOSSEE',
      workshopName: 'Python Programming',
      workshopDay: '2024-01-15',
      status: 'Accepted'
    },
    {
      id: 2,
      coordinatorName: 'John Doe',
      institute: 'IIT Bombay',
      workshopName: 'Data Science',
      workshopDay: '2024-01-20',
      status: 'Accepted'
    }
  ]);

  const [proposedWorkshops] = useState([
    {
      id: 3,
      coordinatorName: 'Alice Johnson',
      institute: 'MIT',
      workshopName: 'Machine Learning',
      workshopDay: '2024-02-01',
      status: 'Pending',
      action: 'Accept'
    },
    {
      id: 4,
      coordinatorName: 'Bob Wilson',
      institute: 'Stanford',
      workshopName: 'Web Development',
      workshopDay: '2024-02-05',
      status: 'Pending',
      action: 'Accept'
    }
  ]);

  const isCoordinator = user?.role === 'coordinator';
  const isInstructor = user?.role === 'instructor';

  return (
    <div className="workshop-status-page">
      {/* Welcome Section for empty state */}
      {isInstructor && acceptedWorkshops.length === 0 && proposedWorkshops.length === 0 && (
        <div className="jumbotron">
          <h1>Welcome {user?.firstName || user?.name}</h1>
          <p>
            Your workshop related information will be shown here. Please navigate to <b>Workshop list</b> and
            depending upon your expertise and availability create a workshop by going to
            <b>Create Workshop</b>.
          </p>
        </div>
      )}

      {/* Instructor View */}
      {isInstructor && (acceptedWorkshops.length > 0 || proposedWorkshops.length > 0) && (
        <>
          <h3 className="text-center">The status of your workshops</h3>
          <br />

          {/* Accepted Workshops */}
          <div className="container">
            <h3 className="text-center table-heading">
              <strong>Workshops Accepted</strong>
            </h3>
            <table className="table table-striped table-responsive-sm">
              <thead>
                <tr>
                  <th>Coordinator Name</th>
                  <th>Institute</th>
                  <th>Workshop Name</th>
                  <th>Workshop Day</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {acceptedWorkshops.map((workshop) => (
                  <tr key={workshop.id}>
                    <td>{workshop.coordinatorName}</td>
                    <td>{workshop.institute}</td>
                    <td>{workshop.workshopName}</td>
                    <td>{workshop.workshopDay}</td>
                    <td>
                      <span className="badge badge-success">{workshop.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Proposed Workshops */}
          <br />
          <div className="container">
            <h3 className="text-center table-heading">
              <strong>Workshops Proposed By Coordinators</strong>
            </h3>
            <table className="table table-striped table-responsive-sm">
              <thead>
                <tr>
                  <th>Coordinator Name</th>
                  <th>Institute</th>
                  <th>Workshop Name</th>
                  <th>Workshop Day</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {proposedWorkshops.map((workshop) => (
                  <tr key={workshop.id}>
                    <td>{workshop.coordinatorName}</td>
                    <td>{workshop.institute}</td>
                    <td>{workshop.workshopName}</td>
                    <td>{workshop.workshopDay}</td>
                    <td>
                      <span className="badge badge-warning">{workshop.status}</span>
                    </td>
                    <td>
                      <button className="btn btn-primary btn-sm">
                        {workshop.action}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Coordinator View */}
      {isCoordinator && (
        <>
          <div className="container">
            <h1 className="page-title">Workshop Status</h1>
            <p className="page-subtitle">Track the status of your workshop proposals</p>
          </div>

          {/* Accepted Workshops */}
          <div className="container">
            <h2 className="section-title">Workshops Accepted</h2>
            <table className="workshop-table">
              <thead>
                <tr>
                  <th>Workshop Name</th>
                  <th>Workshop Day</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Python Programming</td>
                  <td>2024-01-15</td>
                  <td><span className="badge accepted">Accepted</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Proposed Workshops */}
          <div className="container">
            <h2 className="section-title">Workshops Proposed By Me</h2>
            <table className="workshop-table">
              <thead>
                <tr>
                  <th>Workshop Type</th>
                  <th>Workshop Day</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Data Science</td>
                  <td>2024-02-01</td>
                  <td><span className="badge pending">Pending</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default WorkshopStatus;
