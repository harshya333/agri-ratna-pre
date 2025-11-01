import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../utils';
import { ToastContainer } from 'react-toastify';
import Sidebar from '../components/sidebar';
import MyEquipments from '../components/equipements';
import MyBooking from '../components/Booking';
import MyLending from '../components/Lending';
import Profile from '../components/profile';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Home.css'; // Create this CSS file

function Home() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      handleError('User not logged in');
      navigate('/login');
    }
    
    // Check user's preferred color scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
    
    // Add class to body based on dark mode
    if (prefersDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [navigate]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-theme' : ''}`}>
      <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="main-content">
        <div className="content-container">
          <Profile darkMode={darkMode} />
          <MyEquipments darkMode={darkMode} />
          <MyBooking darkMode={darkMode} />
          <MyLending darkMode={darkMode} />
        </div>
        <ToastContainer position="bottom-right" theme={darkMode ? 'dark' : 'light'} />
      </main>
    </div>
  );
}

export default Home;