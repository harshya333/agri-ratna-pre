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
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      handleError('User not logged in');
      navigate('/login');
      return;
    }

    // Check user’s system dark mode preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
    document.body.classList.toggle('dark-theme', prefersDark);
  }, [navigate]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle('dark-theme', newMode);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-theme' : ''}`}>
      <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="main-content">
        <div className="content-container">
          {/* Sections */}
          <Profile darkMode={darkMode} />
          <MyEquipments darkMode={darkMode} />
          <MyBooking darkMode={darkMode} />
          <MyLending darkMode={darkMode} />
        </div>

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          theme={darkMode ? 'dark' : 'light'}
        />
      </main>
    </div>
  );
}

export default Home;
