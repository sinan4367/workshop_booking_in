import React, { useState } from 'react';
import './WorkshopTypes.css';

const WorkshopTypes = ({ user }) => {
  // Mock data for workshop types
  const [workshopTypes, setWorkshopTypes] = useState([
    {
      id: 1,
      name: 'Python Programming',
      description: 'Learn Python programming fundamentals and advanced concepts',
      duration: '2',
      level: 'Beginner to Advanced',
      icon: '💻',
      terms_and_conditions: 'Participants must bring their own laptops. Basic programming knowledge recommended.'
    },
    {
      id: 2,
      name: 'Data Science',
      description: 'Introduction to data analysis and machine learning basics',
      duration: '3',
      level: 'Intermediate',
      icon: '📊',
      terms_and_conditions: 'Participants should have basic statistics knowledge. Python experience required.'
    },
    {
      id: 3,
      name: 'Machine Learning',
      description: 'Deep dive into ML algorithms and applications',
      duration: '4',
      level: 'Advanced',
      icon: '🤖',
      terms_and_conditions: 'Strong programming background required. Mathematics knowledge essential.'
    },
    {
      id: 4,
      name: 'Web Development',
      description: 'Modern web development with HTML, CSS, and JavaScript',
      duration: '2',
      level: 'Beginner to Intermediate',
      icon: '🌐',
      terms_and_conditions: 'No prior experience needed. Basic computer skills required.'
    },
    {
      id: 5,
      name: 'Cloud Computing',
      description: 'Cloud architecture and deployment strategies',
      duration: '3',
      level: 'Intermediate',
      icon: '☁️',
      terms_and_conditions: 'Basic networking knowledge required. AWS/Azure familiarity helpful.'
    },
    {
      id: 6,
      name: 'Cybersecurity',
      description: 'Network security and ethical hacking fundamentals',
      duration: '2',
      level: 'Intermediate',
      icon: '🔒',
      terms_and_conditions: 'Basic networking knowledge required. No prior security experience needed.'
    }
  ]);

  // State for add workshop type form
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    description: '',
    terms_and_conditions: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Check if user is instructor
  const isInstructor = user?.role === 'instructor';

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Workshop name is required';
    }
    
    if (!formData.duration.trim()) {
      errors.duration = 'Duration is required';
    } else if (isNaN(formData.duration) || parseInt(formData.duration) < 1) {
      errors.duration = 'Duration must be a positive number';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    
    if (!formData.terms_and_conditions.trim()) {
      errors.terms_and_conditions = 'Terms and conditions are required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Create new workshop type
      const newWorkshopType = {
        id: workshopTypes.length + 1,
        name: formData.name,
        description: formData.description,
        duration: formData.duration + (parseInt(formData.duration) === 1 ? ' day' : ' days'),
        level: 'Custom',
        icon: '🆕',
        terms_and_conditions: formData.terms_and_conditions
      };
      
      setWorkshopTypes(prev => [...prev, newWorkshopType]);
      
      // Reset form
      setFormData({
        name: '',
        duration: '',
        description: '',
        terms_and_conditions: ''
      });
      setFormErrors({});
      setShowAddForm(false);
      
      // Show success message (in real app, this would be a toast/notification)
      alert('Workshop type added successfully!');
    }
  };

  // Cancel form
  const handleCancel = () => {
    setFormData({
      name: '',
      duration: '',
      description: '',
      terms_and_conditions: ''
    });
    setFormErrors({});
    setShowAddForm(false);
  };

  return (
    <div className="workshop-types-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="page-title">Workshop Types</h1>
            <p className="page-subtitle">
              Browse available workshop types and choose the right one for your needs
            </p>
          </div>
          {isInstructor && (
            <button 
              className="add-workshop-btn"
              onClick={() => setShowAddForm(true)}
            >
              <span className="btn-icon">+</span>
              Add Workshop Type
            </button>
          )}
        </div>
      </div>

      {/* Add Workshop Type Form Modal */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="add-workshop-modal">
            <div className="modal-header">
              <h2 className="modal-title">New Workshop Type</h2>
              <button className="modal-close" onClick={handleCancel}>
                <span>×</span>
              </button>
            </div>
            
            <form className="add-workshop-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label className="form-label">Workshop Name:</label>
                <div className="form-field">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`form-input ${formErrors.name ? 'error' : ''}`}
                    placeholder="Enter workshop name"
                  />
                  {formErrors.name && (
                    <span className="error-message">{formErrors.name}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <label className="form-label">Duration (days):</label>
                <div className="form-field">
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className={`form-input ${formErrors.duration ? 'error' : ''}`}
                    placeholder="Enter duration in days"
                    min="1"
                  />
                  {formErrors.duration && (
                    <span className="error-message">{formErrors.duration}</span>
                  )}
                  <span className="form-help">Number of days the workshop will run</span>
                </div>
              </div>

              <div className="form-row">
                <label className="form-label">Description:</label>
                <div className="form-field">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className={`form-textarea ${formErrors.description ? 'error' : ''}`}
                    placeholder="Enter workshop description"
                    rows="3"
                  />
                  {formErrors.description && (
                    <span className="error-message">{formErrors.description}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <label className="form-label">Terms and Conditions:</label>
                <div className="form-field">
                  <textarea
                    name="terms_and_conditions"
                    value={formData.terms_and_conditions}
                    onChange={handleInputChange}
                    className={`form-textarea ${formErrors.terms_and_conditions ? 'error' : ''}`}
                    placeholder="Enter terms and conditions"
                    rows="4"
                  />
                  {formErrors.terms_and_conditions && (
                    <span className="error-message">{formErrors.terms_and_conditions}</span>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Create Workshop Type
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
