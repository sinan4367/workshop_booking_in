import React, { useState, useRef, useEffect } from "react";
import "./UserDropdown.css";

const UserDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Menu items matching Django template: Profile, Change Password, Logout
  const menuItems = [
    {
      name: "Profile",
      href: "/profile",
      icon: (
        <svg
          width="16"
          height="16"
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
      ),
    },
    {
      name: "Change Password",
      href: "/password/change",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      ),
    },
    {
      name: "Logout",
      href: "/logout",
      icon: (
        <svg
          width="16"
          height="16"
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
      ),
      isLogout: true,
      onClick: onLogout,
    },
  ];

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  };

  // Generate consistent avatar colors based on name
  const getAvatarColor = (name) => {
    if (!name) return "avatar-blue";
    const colors = [
      "avatar-blue",
      "avatar-green",
      "avatar-purple",
      "avatar-pink",
      "avatar-indigo",
      "avatar-teal",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="user-dropdown" ref={dropdownRef}>
      <button
        className="dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="user-info">
          {/* User Avatar */}
          <div className={`user-avatar ${getAvatarColor(user?.name)}`}>
            {getInitials(user?.name)}
          </div>

          {/* User Name */}
          <div className="user-details">
            <span className="user-name">{user?.name}</span>
            <span className="user-role">{capitalize(user?.role)}</span>
          </div>
        </div>

        {/* Dropdown Arrow */}
        <svg
          className={`dropdown-arrow ${isOpen ? "open" : ""}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="dropdown-menu">
          {/* User Info Header */}
          <div className="dropdown-header">
            <div className={`header-avatar ${getAvatarColor(user?.name)}`}>
              {getInitials(user?.name)}
            </div>
            <div className="header-info">
              <div className="header-name">{user?.name}</div>
              <div className="header-role">{capitalize(user?.role)}</div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="dropdown-items">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={
                  item.onClick
                    ? (e) => {
                        e.preventDefault();
                        item.onClick();
                      }
                    : item.isLogout
                      ? (e) => {
                          e.preventDefault();
                          console.log("Logging out...");
                        }
                      : undefined
                }
                className={`dropdown-item ${item.isLogout ? "logout" : ""}`}
              >
                <span className="item-icon">{item.icon}</span>
                <span className="item-text">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
