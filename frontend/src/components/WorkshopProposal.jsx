import React, { useState, useEffect } from 'react';
import './WorkshopProposal.css';

const WorkshopProposal = ({ user }) => {
  const [formData, setFormData] = useState({
    workshop_type: '',
    date: '',
    tnc_accepted: false
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [tncContent, setTncContent] = useState('');
  const [workshopTypes, setWorkshopTypes] = useState([
    { id: 1, name: 'Python Programming', tnc: 'Python Programming Terms and Conditions: This workshop covers fundamental programming concepts using Python. Participants must have basic computer skills. Duration: 2 days. Certificate provided upon completion.' },
    { id: 2, name: 'Data Science Basics', tnc: 'Data Science Terms and Conditions: This workshop introduces data analysis and visualization. Basic statistics knowledge required. Duration: 3 days. Hands-on projects included.' },
    { id: 3, name: 'Machine Learning', tnc: 'Machine Learning Terms and Conditions: Advanced workshop covering ML algorithms. Programming experience required. Duration: 4 days. Participants receive certificate.' },
    { id: 4, name: 'Web Development', tnc: 'Web Development Terms and Conditions: Full-stack web development workshop. HTML/CSS/JS knowledge helpful. Duration: 3 days. Portfolio projects included.' },
    { id: 5, name: 'Cloud Computing', tnc: 'Cloud Computing Terms and Conditions: Cloud infrastructure and services workshop. Basic networking knowledge required. Duration: 2 days. AWS/Azure concepts covered.' },
    { id: 6, name: 'Cybersecurity', tnc: 'Cybersecurity Terms and Conditions: Information security fundamentals workshop. IT background recommended. Duration: 2 days. Practical exercises included.' }
  ]);

  // Date picker functionality matching Django logic
  useEffect(() => {
    // Set minimum date (3 days from now) and maximum date (1 year from now)
    const dateToday = new Date();
    const minDate = new Date();
    const maxDate = new Date();
    
    minDate.setDate(dateToday.getDate() + 3);
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    
    // Initialize date picker if needed
    if (formData.date) {
      const selectedDate = new Date(formData.date);
      if (selectedDate < minDate || selectedDate > maxDate) {
        setFormData(prev => ({ ...prev, date: '' }));
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.workshop_type) {
      newErrors.workshop_type = 'Please select a workshop type';
    }
    
    if (!formData.date) {
      newErrors.date = 'Please select a workshop date';
    } else {
      const selectedDate = new Date(formData.date);
      const minDate = new Date();
      const maxDate = new Date();
      
      minDate.setDate(minDate.getDate() + 3);
      maxDate.setFullYear(maxDate.getFullYear() + 1);
      
      if (selectedDate < minDate) {
        newErrors.date = 'Workshop date must be at least 3 days from today';
      } else if (selectedDate > maxDate) {
        newErrors.date = 'Workshop date cannot be more than 1 year from today';
      }
    }
    
    if (!formData.tnc_accepted) {
      newErrors.tnc_accepted = 'You must accept the terms and conditions';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      // Form is valid, submit it
      console.log('Form submitted:', formData);
      alert('Workshop proposal submitted successfully!');
      // Reset form
      setFormData({
        workshop_type: '',
        date: '',
        tnc_accepted: false
      });
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  const handleShowTnC = (e) => {
    e.preventDefault();
    if (!formData.workshop_type) {
      setTncContent('<p class="text-danger">Please select a workshop type</p>');
    } else {
      const selectedWorkshop = workshopTypes.find(w => w.id === parseInt(formData.workshop_type));
      if (selectedWorkshop) {
        setTncContent(selectedWorkshop.tnc);
      }
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Get min and max dates for date input
  const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="workshop-proposal">
      <div className="proposal-container">
        {/* Alert Card */}
        <div className="info-card alert-card">
          <div className="card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <div className="card-content">
            <h3>Important Notice</h3>
            <p>Before proposing the workshop, please check about the workshop in the <strong>Workshop Types</strong> section</p>
          </div>
        </div>

        {/* Main Proposal Card */}
        <div className="main-proposal-card">
          <div className="card-header">
            <div className="icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div className="header-text">
              <h1>Propose Workshop</h1>
              <p>Fill in the details to propose a new workshop</p>
            </div>
          </div>
          
          <div className="card-body">
            <form onSubmit={handleSubmit} className="proposal-form">
              {/* Workshop Type */}
              <div className="form-field">
                <label className="form-label">Workshop Type</label>
                <select
                  name="workshop_type"
                  value={formData.workshop_type}
                  onChange={handleInputChange}
                  className={`form-control ${errors.workshop_type ? 'is-invalid' : ''}`}
                >
                  <option value="">Select a workshop type</option>
                  {workshopTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
                {errors.workshop_type && (
                  <div className="error-message">{errors.workshop_type}</div>
                )}
              </div>

              {/* Date */}
              <div className="form-field">
                <label className="form-label">Workshop Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={getMinDate()}
                  max={getMaxDate()}
                  className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                />
                {errors.date && (
                  <div className="error-message">{errors.date}</div>
                )}
                <small className="form-hint">
                  Workshop date must be at least 3 days from today and within 1 year
                </small>
              </div>

              {/* Terms & Conditions */}
              <div className="form-field">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="tnc_accepted"
                    checked={formData.tnc_accepted}
                    onChange={handleInputChange}
                    className={`form-checkbox ${errors.tnc_accepted ? 'is-invalid' : ''}`}
                  />
                  <span className="checkbox-custom"></span>
                  I accept the
                  <a href="#" onClick={handleShowTnC}>
                    terms and conditions
                  </a>
                </label>
                {errors.tnc_accepted && (
                  <div className="error-message">{errors.tnc_accepted}</div>
                )}
              </div>

              {/* Error Summary */}
              {Object.keys(errors).length > 0 && (
                <div className="error-card">
                  <div className="error-header">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <h4>Errors</h4>
                  </div>
                  <ul className="error-list">
                    {Object.values(errors).map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Submit Button */}
              <div className="submit-section">
                <button type="submit" className="submit-btn">
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">Terms and Conditions</h3>
                <button type="button" className="modal-close" onClick={closeModal}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div className="modal-body" dangerouslySetInnerHTML={{ __html: tncContent }}>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkshopProposal;
