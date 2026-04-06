import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './TeamStatistics.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TeamStatistics = () => {
  // Mock data for teams
  const [allTeams] = useState([
    { id: 1, name: 'Team 1', creator: 'Dr. Rajesh Kumar' },
    { id: 2, name: 'Team 2', creator: 'Prof. Amit Sharma' },
    { id: 3, name: 'Team 3', creator: 'Dr. Vikram Patel' },
    { id: 4, name: 'Team 4', creator: 'Prof. Anjali Gupta' },
  ]);

  const [selectedTeam, setSelectedTeam] = useState(1);

  // Mock data for team members and their workshop counts
  const getTeamData = (teamId) => {
    const teamData = {
      1: {
        labels: ['Dr. Rajesh Kumar', 'Prof. Amit Sharma', 'Dr. Vikram Patel', 'Prof. Anjali Gupta'],
        workshopCounts: [12, 8, 15, 6]
      },
      2: {
        labels: ['Dr. Priya Singh', 'Prof. Rahul Verma', 'Dr. Meera Reddy', 'Prof. Sanjay Kumar'],
        workshopCounts: [10, 7, 9, 11]
      },
      3: {
        labels: ['Dr. Sameer Khan', 'Prof. Neha Sharma', 'Dr. Arjun Patel', 'Prof. Kavita Reddy'],
        workshopCounts: [14, 5, 8, 12]
      },
      4: {
        labels: ['Dr. Anil Kumar', 'Prof. Pooja Singh', 'Dr. Ramesh Patel', 'Prof. Sunita Gupta'],
        workshopCounts: [9, 13, 7, 10]
      }
    };
    return teamData[teamId] || { labels: [], workshopCounts: [] };
  };

  const currentTeamData = getTeamData(selectedTeam);

  // Chart configuration
  const chartData = {
    labels: currentTeamData.labels,
    datasets: [
      {
        label: 'Team Members Workshops',
        data: currentTeamData.workshopCounts,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Team Statistics - ${allTeams.find(t => t.id === selectedTeam)?.name || 'Team'}`
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Workshops'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Team Members'
        }
      }
    }
  };

  return (
    <div className="team-statistics">
      <div className="team-statistics-container">
        <div className="team-sidebar">
          <div className="team-navigation">
            <h3 className="team-nav-title">Select Team</h3>
            <div className="team-nav-list">
              {allTeams.map((team, index) => (
                <button
                  key={team.id}
                  className={`team-nav-item ${selectedTeam === team.id ? 'active' : ''}`}
                  onClick={() => setSelectedTeam(team.id)}
                >
                  <span className="team-number">Team {index + 1}</span>
                  <span className="team-creator">{team.creator}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="team-content">
          <div className="team-header">
            <h2 className="team-title">
              Team Statistics - {allTeams.find(t => t.id === selectedTeam)?.name || 'Team'}
            </h2>
            <p className="team-subtitle">
              Workshop count for each team member
            </p>
          </div>

          <div className="chart-container">
            <div className="chart-wrapper">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>

          <div className="team-summary">
            <h3 className="summary-title">Team Summary</h3>
            <div className="summary-grid">
              <div className="summary-card">
                <div className="summary-label">Total Members</div>
                <div className="summary-value">{currentTeamData.labels.length}</div>
              </div>
              <div className="summary-card">
                <div className="summary-label">Total Workshops</div>
                <div className="summary-value">
                  {currentTeamData.workshopCounts.reduce((a, b) => a + b, 0)}
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-label">Average Workshops</div>
                <div className="summary-value">
                  {currentTeamData.labels.length > 0 
                    ? (currentTeamData.workshopCounts.reduce((a, b) => a + b, 0) / currentTeamData.labels.length).toFixed(1)
                    : 0
                  }
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-label">Top Performer</div>
                <div className="summary-value">
                  {currentTeamData.labels.length > 0
                    ? currentTeamData.labels[currentTeamData.workshopCounts.indexOf(Math.max(...currentTeamData.workshopCounts))]
                    : 'N/A'
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamStatistics;
