import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTractor, FaPlusCircle, FaSearch, FaUser, FaSignOutAlt, FaHome } from 'react-icons/fa';
import '../styles/Sidebar.css'

function Sidebar({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className={`sidebar ${darkMode ? 'dark' : ''}`}>
      <div className="sidebar-logo" onClick={() => navigate('/home')}>
        <FaTractor className="logo-icon" />
        <span>AgriRental</span>
      </div>

      <div className="sidebar-menu">
        <button 
          className="sidebar-button" 
          onClick={() => navigate('/home')}
        >
          <FaHome className="button-icon" />
          <span>Dashboard</span>
        </button>
        
        <button 
          className="sidebar-button" 
          onClick={() => navigate('/addEquip')}
        >
          <FaPlusCircle className="button-icon" />
          <span>Add Equipment</span>
        </button>
        
  <button 
          className="sidebar-button" 
          onClick={() => navigate('/consultants')}
        >
          <FaUser className="button-icon" />
          <span>Consultants</span>
        </button>

        <button 
          className="sidebar-button" 
          onClick={() => navigate('/disEquip')}
        >
          <FaSearch className="button-icon" />
          <span>Browse Equipment</span>
        </button>
        
        <button 
          className="sidebar-button" 
          onClick={() => navigate('/editProfile')}
        >
          <FaUser className="button-icon" />
          <span>Edit Profile</span>
        </button>
      </div>

      <div className="sidebar-footer">
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
        
        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt className="button-icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;