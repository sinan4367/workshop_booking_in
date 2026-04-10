import React, { useState, useEffect } from "react";
import UserDropdown from "./UserDropdown";
import MobileMenu from "./MobileMenu";
import "./Navbar.css";

const Navbar = ({ user, currentPage, onNavigate, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
    // Normalize paths for comparison
    const normalizePath = (p) => p.replace(/\/$/, "");
    return normalizePath(currentPage) === normalizePath(path);
  };

  // Check if user is in instructor group
  const isInstructor = user?.role === "instructor";

  // Get navigation links based on authentication and role (matching Django logic exactly)
  const getNavigationLinks = () => {
    if (!user?.isAuthenticated) {
      // Guest/Public users see: Home, Workshop Statistics
      return [
        { name: "Home", href: "/", icon: "home" },
        {
          name: "Workshop Statistics",
          href: "/statistics/public",
          icon: "stats",
        },
      ];
    }

    // Authenticated users base links: Workshop Status, Workshop Types
    const baseLinks = [
      { name: "Workshop Status", href: "/workshop/status", icon: "status" },
      { name: "Workshop Types", href: "/workshop/types", icon: "types" },
    ];

    // Role-specific logic:
    // If user is instructor: Show Team Statistics
    // If user is NOT instructor (coordinator): Show Propose Workshop
    if (isInstructor) {
      return [
        ...baseLinks,
        { name: "Team Statistics", href: "/statistics/team", icon: "team" },
      ];
    } else {
      // Coordinator or other authenticated users
      return [
        ...baseLinks,
        {
          name: "Propose Workshop",
          href: "/workshop/propose",
          icon: "propose",
        },
      ];
    }
  };

  const navigationLinks = getNavigationLinks();

  // SVG Icons components
  const Icons = {
    home: (
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
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    ),
    stats: (
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
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
      </svg>
    ),
    status: (
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
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      </svg>
    ),
    types: (
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
        <path d="M4 7V4h16v3"></path>
        <path d="M9 20h6"></path>
        <path d="M12 4v16"></path>
      </svg>
    ),
    team: (
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
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    propose: (
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
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="16"></line>
        <line x1="8" y1="12" x2="16" y2="12"></line>
      </svg>
    ),
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-container">
          {/* Logo/Brand */}
          <div className="navbar-brand">
            <a
              href="/"
              className="brand-link"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate("/");
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                className="brand-icon"
              >
                <path
                  d="M12 2L2 7l10 5 10-5-10-5z"
                  fill="currentColor"
                  opacity="0.9"
                />
                <path
                  d="M2 17l10 5 10-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12l10 5 10-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>FOSSEE Workshops</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <ul className="navbar-nav">
            {navigationLinks.map((link) => (
              <li key={link.name} className="nav-item">
                <a
                  href={link.href}
                  className={`nav-link ${isActive(link.href) ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate(link.href);
                  }}
                >
                  <span className="nav-icon">{Icons[link.icon]}</span>
                  <span className="nav-text">{link.name}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Right Section */}
          <div className="navbar-actions">
            {user?.isAuthenticated ? (
              <UserDropdown user={user} onLogout={onLogout} />
            ) : null}

            {/* Mobile menu button */}
            <button
              className={`mobile-menu-btn ${isMobileMenuOpen ? "open" : ""}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        user={user}
        links={navigationLinks}
        currentPage={currentPage}
        icons={Icons}
        isActive={isActive}
      />
    </>
  );
};

export default Navbar;
