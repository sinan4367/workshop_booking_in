import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './WorkshopStatistics.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WorkshopStatistics = () => {
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    workshop: '',
    state: '',
    sortBy: 'date'
  });

  const [showStateChart, setShowStateChart] = useState(false);
  const [showWorkshopsChart, setShowWorkshopsChart] = useState(false);

  // Mock data for table
  const tableData = [
    {
      srNo: 1,
      coordinatorName: 'Dr. Rajesh Kumar',
      instituteName: 'IIT Bombay',
      instructorName: 'Prof. Amit Sharma',
      workshopName: 'Python Programming',
      workshopDate: '2024-01-15'
    },
    {
      srNo: 2,
      coordinatorName: 'Dr. Priya Singh',
      instituteName: 'NIT Delhi',
      instructorName: 'Dr. Vikram Patel',
      workshopName: 'Data Science Basics',
      workshopDate: '2024-01-20'
    },
    {
      srNo: 3,
      coordinatorName: 'Prof. Anjali Gupta',
      instituteName: 'IIT Madras',
      instructorName: 'Dr. Sanjay Kumar',
      workshopName: 'Machine Learning',
      workshopDate: '2024-01-25'
    },
    {
      srNo: 4,
      coordinatorName: 'Dr. Meera Reddy',
      instituteName: 'IISc Bangalore',
      instructorName: 'Prof. Rahul Verma',
      workshopName: 'Web Development',
      workshopDate: '2024-02-01'
    },
    {
      srNo: 5,
      coordinatorName: 'Prof. Suresh Babu',
      instituteName: 'IIIT Hyderabad',
      instructorName: 'Dr. Neha Sharma',
      workshopName: 'Cloud Computing',
      workshopDate: '2024-02-05'
    },
    {
      srNo: 6,
      coordinatorName: 'Dr. Ashok Menon',
      instituteName: 'IIT Kanpur',
      instructorName: 'Prof. Deepak Singh',
      workshopName: 'Cybersecurity',
      workshopDate: '2024-02-10'
    },
    {
      srNo: 7,
      coordinatorName: 'Prof. Kavita Nair',
      instituteName: 'NIT Trichy',
      instructorName: 'Dr. Arun Kumar',
      workshopName: 'Blockchain Basics',
      workshopDate: '2024-02-15'
    },
    {
      srNo: 8,
      coordinatorName: 'Dr. Ramesh Iyer',
      instituteName: 'IIT Roorkee',
      instructorName: 'Prof. Swati Joshi',
      workshopName: 'AI Ethics',
      workshopDate: '2024-02-20'
    }
  ];

  // Mock data for charts
  const stateChartData = {
    labels: ['Maharashtra', 'Delhi', 'Tamil Nadu', 'Karnataka', 'Telangana', 'Uttar Pradesh'],
    datasets: [{
      label: 'Number of Workshops',
      data: [12, 8, 15, 10, 7, 9],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 1
    }]
  };

  const workshopsChartData = {
    labels: ['Python', 'Data Science', 'Machine Learning', 'Web Development', 'Cloud Computing', 'Cybersecurity'],
    datasets: [{
      label: 'Number of Workshops',
      data: [25, 18, 22, 15, 20, 12],
      backgroundColor: 'rgba(34, 197, 94, 0.5)',
      borderColor: 'rgba(34, 197, 94, 1)',
      borderWidth: 1
    }]
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      fromDate: '',
      toDate: '',
      workshop: '',
      state: '',
      sortBy: 'date'
    });
  };

  return (
    <div className="workshop-statistics-page">
      {/* Page Title */}
      <div className="page-header">
        <h1 className="page-title">Workshop Statistics</h1>
        <p className="page-subtitle">View and analyze workshop data across different states and types</p>
      </div>

      {/* Main Layout Grid */}
      <div className="main-layout">
        
        {/* LEFT SIDE - FILTERS */}
        <div className="filters-card">
          <div className="filters-header">
            <h2 className="filters-title">Filters</h2>
            <button
              onClick={clearFilters}
              className="clear-button"
            >
              Clear
            </button>
          </div>

          <div className="filters-content">
            {/* From Date */}
            <div className="form-group">
              <label className="form-label">
                From Date
              </label>
              <input
                type="date"
                value={filters.fromDate}
                onChange={(e) => handleFilterChange('fromDate', e.target.value)}
                className="form-input"
              />
            </div>

            {/* To Date */}
            <div className="form-group">
              <label className="form-label">
                To Date
              </label>
              <input
                type="date"
                value={filters.toDate}
                onChange={(e) => handleFilterChange('toDate', e.target.value)}
                className="form-input"
              />
            </div>

            {/* Workshop */}
            <div className="form-group">
              <label className="form-label">
                Workshop
              </label>
              <select
                value={filters.workshop}
                onChange={(e) => handleFilterChange('workshop', e.target.value)}
                className="form-input"
              >
                <option value="">All Workshops</option>
                <option value="python">Python Programming</option>
                <option value="data-science">Data Science</option>
                <option value="machine-learning">Machine Learning</option>
                <option value="web-development">Web Development</option>
                <option value="cloud-computing">Cloud Computing</option>
              </select>
            </div>

            {/* State */}
            <div className="form-group">
              <label className="form-label">
                State
              </label>
              <select
                value={filters.state}
                onChange={(e) => handleFilterChange('state', e.target.value)}
                className="form-input"
              >
                <option value="">All States</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="delhi">Delhi</option>
                <option value="tamil-nadu">Tamil Nadu</option>
                <option value="karnataka">Karnataka</option>
                <option value="telangana">Telangana</option>
              </select>
            </div>

            {/* Sort By */}
            <div className="form-group">
              <label className="form-label">
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="form-input"
              >
                <option value="date">Date</option>
                <option value="name">Name</option>
                <option value="state">State</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="filter-buttons">
              <button className="view-button">
                View
              </button>
              <button className="download-button">
                Download
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="content-section">
          
          {/* TOP ROW - Chart Buttons */}
          <div className="top-row">
            {/* Chart Buttons */}
            <div className="chart-buttons">
              <button
                onClick={() => setShowStateChart(true)}
                className="chart-button"
              >
                State Chart
              </button>
              <button
                onClick={() => setShowWorkshopsChart(true)}
                className="chart-button"
              >
                Workshops Chart
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="table-card">
            <div className="table-container">
              <table className="data-table">
                {/* Header */}
                <thead className="table-header">
                  <tr>
                    <th className="table-header-cell">
                      Sr No
                    </th>
                    <th className="table-header-cell">
                      Coordinator Name
                    </th>
                    <th className="table-header-cell">
                      Institute Name
                    </th>
                    <th className="table-header-cell">
                      Instructor Name
                    </th>
                    <th className="table-header-cell">
                      Workshop Name
                    </th>
                    <th className="table-header-cell">
                      Workshop Date
                    </th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {tableData.map((row, index) => (
                    <tr 
                      key={row.srNo}
                      className="table-row"
                    >
                      <td className="table-cell">
                        {row.srNo}
                      </td>
                      <td className="table-cell">
                        {row.coordinatorName}
                      </td>
                      <td className="table-cell">
                        {row.instituteName}
                      </td>
                      <td className="table-cell">
                        {row.instructorName}
                      </td>
                      <td className="table-cell">
                        {row.workshopName}
                      </td>
                      <td className="table-cell">
                        {row.workshopDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* STATE CHART MODAL */}
      {showStateChart && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">State-wise Workshop Distribution</h3>
              <button
                onClick={() => setShowStateChart(false)}
                className="modal-close"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <Bar data={stateChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } }} } />
            </div>
          </div>
        </div>
      )}

      {/* WORKSHOPS CHART MODAL */}
      {showWorkshopsChart && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Workshop Type Distribution</h3>
              <button
                onClick={() => setShowWorkshopsChart(false)}
                className="modal-close"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <Bar data={workshopsChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } }} } />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkshopStatistics;
