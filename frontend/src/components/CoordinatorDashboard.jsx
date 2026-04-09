import React, { useState } from 'react';
import './CoordinatorDashboard.css';

const CoordinatorDashboard = ({ user, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [quickActions, setQuickActions] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (path) => {
    setIsLoading(true);
    setFeedback({ message: 'Loading...', type: 'loading' });
    
    setTimeout(() => {
      onNavigate(path);
      setIsLoading(false);
      setFeedback({ message: 'Navigation successful!', type: 'success' });
      
      setTimeout(() => {
        setFeedback({ message: '', type: '' });
      }, 2000);
    }, 500);
    
    closeMobileMenu();
  };

  const handleQuickAction = (action) => {
    switch(action) {
      case 'refresh':
        setFeedback({ message: 'Refreshing dashboard...', type: 'loading' });
        setTimeout(() => {
          setFeedback({ message: 'Dashboard refreshed!', type: 'success' });
          setTimeout(() => setFeedback({ message: '', type: '' }), 2000);
        }, 1000);
        break;
      case 'settings':
        setFeedback({ message: 'Opening settings...', type: 'loading' });
        setTimeout(() => {
          setFeedback({ message: 'Settings opened!', type: 'success' });
          setTimeout(() => setFeedback({ message: '', type: '' }), 2000);
        }, 500);
        break;
      case 'help':
        setFeedback({ message: 'Loading help...', type: 'loading' });
        setTimeout(() => {
          setFeedback({ message: 'Help center opened!', type: 'success' });
          setTimeout(() => setFeedback({ message: '', type: '' }), 2000);
        }, 500);
        break;
      default:
        break;
    }
  };

  const handleMenuToggle = () => {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    if (toggle && overlay) {
      toggle.classList.toggle('open');
      overlay.style.display = overlay.style.display === 'block' ? 'none' : 'block';
    }
  };

  return (
    <div className="dashboard">
      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-toggle"
        onClick={handleMenuToggle}
        aria-label="Toggle navigation menu"
      >
        <span className="hamburger-icon"></span>
        <span className="hamburger-icon"></span>
        <span className="hamburger-icon"></span>
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <h3>Navigation</h3>
              <button className="mobile-menu-close" onClick={closeMobileMenu}>
                ×
              </button>
            </div>
            <div className="mobile-menu-items">
              <button className="mobile-menu-item" onClick={() => handleNavigation('/workshop/propose')}>
                <span className="mobile-menu-icon">📝</span>
                <span>Propose Workshop</span>
              </button>
              <button className="mobile-menu-item" onClick={() => handleNavigation('/workshop/status')}>
                <span className="mobile-menu-icon">📊</span>
                <span>Workshop Status</span>
              </button>
              <button className="mobile-menu-item" onClick={() => handleNavigation('/workshop/types')}>
                <span className="mobile-menu-icon">📚</span>
                <span>Workshop Types</span>
              </button>
              <button className="mobile-menu-item" onClick={() => handleNavigation('/statistics/public')}>
                <span className="mobile-menu-icon">📈</span>
                <span>Statistics</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions Bar */}
      <div className="quick-actions-bar">
        <button 
          className="quick-action-btn"
          onClick={() => handleQuickAction('refresh')}
          disabled={isLoading}
        >
          <span className="quick-action-icon">🔄</span>
          <span className="quick-action-label">Refresh</span>
        </button>
        
        <button 
          className="quick-action-btn"
          onClick={() => handleQuickAction('settings')}
          disabled={isLoading}
        >
          <span className="quick-action-icon">⚙️</span>
          <span className="quick-action-label">Settings</span>
        </button>
        
        <button 
          className="quick-action-btn"
          onClick={() => handleQuickAction('help')}
          disabled={isLoading}
        >
          <span className="quick-action-icon">❓</span>
          <span className="quick-action-label">Help</span>
        </button>
      </div>

      {/* Feedback Display */}
      {feedback.message && (
        <div className={`feedback-message feedback-${feedback.type}`}>
          {feedback.message}
        </div>
      )}

      {/* Welcome Section */}
      <div className="welcome-section">
        <h1 className="welcome-title">
          Welcome, {user?.name || 'User'} 
        </h1>
        <p className="welcome-subtitle">
          Manage your workshops and track their progress
        </p>
      </div>

      {/* Main Cards */}
      <div className="cards">
        {/* Propose Workshop Card */}
        <div className="card" onClick={() => onNavigate('/workshop/propose')}>
          <h2 className="card-title">
            Propose Workshop
          </h2>
          <p className="card-description">
            Submit a new workshop request
          </p>
          <div className="card-button-wrapper">
            <button 
              className="card-button" 
              onClick={(e) => e.stopPropagation()}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="button-spinner"></span>
                  Loading...
                </>
              ) : (
                '+ Propose Workshop'
              )}
            </button>
          </div>
        </div>

        {/* Workshop Status Card */}
        <div className="card" onClick={() => onNavigate('/workshop/status')}>
          <h2 className="card-title">
            Workshop Status
          </h2>
          <p className="card-description">
            Track status of your proposals
          </p>
          <div className="card-button-wrapper">
            <button 
              className="card-button" 
              onClick={(e) => e.stopPropagation()}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="button-spinner"></span>
                  Loading...
                </>
              ) : (
                'View Status'
              )}
            </button>
          </div>
        </div>

        {/* Workshop Types Card */}
        <div className="card" onClick={() => onNavigate('/workshop/types')}>
          <h2 className="card-title">
            Workshop Types
          </h2>
          <p className="card-description">
            Browse available workshop types
          </p>
          <div className="card-button-wrapper">
            <button 
              className="card-button" 
              onClick={(e) => e.stopPropagation()}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="button-spinner"></span>
                  Loading...
                </>
              ) : (
                'Browse Types'
              )}
            </button>
          </div>
        </div>

        {/* Statistics Card */}
        <div className="card" onClick={() => onNavigate('/statistics/public')}>
          <h2 className="card-title">
            Statistics
          </h2>
          <p className="card-description">
            View public workshop statistics
          </p>
          <div className="card-button-wrapper">
            <button 
              className="card-button" 
              onClick={(e) => e.stopPropagation()}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="button-spinner"></span>
                  Loading...
                </>
              ) : (
                'View Statistics'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorDashboard;
