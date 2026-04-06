import React, { useState } from 'react';
import './WorkshopTypes.css';

const WorkshopTypes = () => {
  // Mock data for workshop types
  const workshopTypes = [
    {
      id: 1,
      name: 'Python Programming',
      description: 'Learn Python programming fundamentals and advanced concepts',
      duration: '2 days',
      level: 'Beginner to Advanced',
      icon: '💻'
    },
    {
      id: 2,
      name: 'Data Science',
      description: 'Introduction to data analysis and machine learning basics',
      duration: '3 days',
      level: 'Intermediate',
      icon: '📊'
    },
    {
      id: 3,
      name: 'Machine Learning',
      description: 'Deep dive into ML algorithms and applications',
      duration: '4 days',
      level: 'Advanced',
      icon: '🤖'
    },
    {
      id: 4,
      name: 'Web Development',
      description: 'Modern web development with HTML, CSS, and JavaScript',
      duration: '2 days',
      level: 'Beginner to Intermediate',
      icon: '🌐'
    },
    {
      id: 5,
      name: 'Cloud Computing',
      description: 'Cloud architecture and deployment strategies',
      duration: '3 days',
      level: 'Intermediate',
      icon: '☁️'
    },
    {
      id: 6,
      name: 'Cybersecurity',
      description: 'Network security and ethical hacking fundamentals',
      duration: '2 days',
      level: 'Intermediate',
      icon: '🔒'
    }
  ];

  return (
    <div className="workshop-types-page">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Workshop Types</h1>
        <p className="page-subtitle">
          Browse available workshop types and choose the right one for your needs
        </p>
      </div>

      {/* Workshop Types Grid */}
      <div className="types-grid">
        {workshopTypes.map((type) => (
          <div key={type.id} className="type-card">
            <div className="type-icon">
              <span className="icon-emoji">{type.icon}</span>
            </div>
            <div className="type-content">
              <h3 className="type-name">{type.name}</h3>
              <p className="type-description">{type.description}</p>
              <div className="type-meta">
                <span className="duration">{type.duration}</span>
                <span className="level">{type.level}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <h2 className="filter-title">Filter by Level</h2>
        <div className="filter-buttons">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Beginner</button>
          <button className="filter-btn">Intermediate</button>
          <button className="filter-btn">Advanced</button>
        </div>
      </div>
    </div>
  );
};

export default WorkshopTypes;
