import React, { useEffect } from "react";
import "./MobileMenu.css";

const MobileMenu = ({
  isOpen,
  onClose,
  user,
  links,
  currentPage,
  icons,
  isActive,
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  };

  const getAvatarColor = (name) => {
    if (!name) return "mobile-avatar-blue";
    const colors = [
      "mobile-avatar-blue",
      "mobile-avatar-green",
      "mobile-avatar-purple",
      "mobile-avatar-pink",
      "mobile-avatar-indigo",
      "mobile-avatar-teal",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="mobile-backdrop" onClick={onClose} aria-hidden="true" />

      {/* Mobile Menu Panel */}
      <div className="mobile-menu" role="dialog" aria-label="Navigation menu">
        {/* Header */}
        <div className="mobile-header">
          <div className="mobile-user-section">
            {user?.isAuthenticated ? (
              <div className="mobile-user-info">
                <div className={`mobile-avatar ${getAvatarColor(user?.name)}`}>
                  {getInitials(user?.name)}
                </div>
                <div className="mobile-user-details">
                  <span className="mobile-user-name">{user?.name}</span>
                  <span className="mobile-user-role">
                    {capitalize(user?.role)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="mobile-guest-info">
                <span className="mobile-guest-name">Guest User</span>
                <span className="mobile-guest-role">Not logged in</span>
              </div>
            )}
          </div>
          <button
            className="mobile-close-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="mobile-content">
          <div className="mobile-section">
            <h3 className="section-title">Navigation</h3>
            <div className="mobile-nav-links">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={onClose}
                  className={`mobile-nav-link ${isActive(link.href) ? "active" : ""}`}
                >
                  <span className="mobile-nav-icon">
                    {icons?.[link.icon] || null}
                  </span>
                  <span className="mobile-nav-text">{link.name}</span>
                  {isActive(link.href) && (
                    <svg
                      className="active-indicator"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* User Actions */}
          {user?.isAuthenticated ? (
            <div className="mobile-section">
              <h3 className="section-title">Account</h3>
              <div className="mobile-actions">
                <a
                  href="/profile"
                  onClick={onClose}
                  className="mobile-action-link"
                >
                  <span className="action-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </span>
                  <span className="action-text">Profile</span>
                </a>
                <a
                  href="/password/change"
                  onClick={onClose}
                  className="mobile-action-link"
                >
                  <span className="action-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </span>
                  <span className="action-text">Change Password</span>
                </a>
                <a
                  href="/logout"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Logging out...");
                    onClose();
                    // Add logout logic here
                  }}
                  className="mobile-action-link logout"
                >
                  <span className="action-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                  </span>
                  <span className="action-text">Logout</span>
                </a>
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="mobile-footer">
          <p className="footer-text">FOSSEE Workshops Portal</p>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
