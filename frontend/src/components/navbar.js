import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTractor, FaHome, FaPlusCircle, FaSearch, FaUser, FaSignOutAlt } from 'react-icons/fa';
import '../styles/Navbar.css'

function Navbar({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className={`navbar ${darkMode ? 'dark' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => navigate('/home')}>
          <FaTractor className="logo-icon" />
          <span className="logo-text">AgriRental</span>
        </div>

        <div className="navbar-links">
          <button className="nav-link" onClick={() => navigate('/home')}>
            <FaHome className="nav-icon" />
            <span className="nav-text">Home</span>
          </button>
          <button className="nav-link" onClick={() => navigate('/addEquip')}>
            <FaPlusCircle className="nav-icon" />
            <span className="nav-text">Add Equipment</span>
          </button>
          <button className="nav-link" onClick={() => navigate('/disEquip')}>
            <FaSearch className="nav-icon" />
            <span className="nav-text">Browse</span>
          </button>
          <button className="nav-link" onClick={() => navigate('/editProfile')}>
            <FaUser className="nav-icon" />
            <span className="nav-text">Profile</span>
          </button>
        </div>

        <div className="navbar-actions">
          <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt className="logout-icon" />
            <span className="logout-text">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;