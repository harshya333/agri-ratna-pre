import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../utils';
import { FaCalendarAlt, FaRupeeSign, FaUser, FaPhone } from 'react-icons/fa';
import '../styles/DashComp.css'

function MyBooking({ darkMode }) {
  const [userId, setUserId] = useState('');
  const [myBookings, setMyBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      handleError('User not logged in');
      navigate('/login');
    } else {
      setUserId(storedUserId);
    }
  }, [navigate]);

  const fetchMyBookings = async () => {
    try {
      const response = await fetch(`http://localhost:5000/protected/myBookings`, {
        headers: {
          'Authorization': localStorage.getItem('token'),
        },
      });
      const result = await response.json();
      setMyBookings(result.data || []);
    } catch (err) {
      handleError(err.message);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchMyBookings();
    }
  }, [userId]);

  return (
    <div className={`card ${darkMode ? 'dark' : ''}`}>
      <h2 className="section-title">
        <FaCalendarAlt className="icon" /> My Bookings
      </h2>

      {myBookings.length > 0 ? (
        <div className="table-container">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Equipment</th>
                <th>Type</th>
                <th>Price/Day</th>
                <th>Lender</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {myBookings.map(({ equipment, lender }, idx) => (
                <tr key={idx}>
                  <td>{equipment?.name || 'N/A'}</td>
                  <td>{equipment?.type || 'N/A'}</td>
                  <td><FaRupeeSign /> {equipment?.pricePerDay || 'N/A'}</td>
                  <td><FaUser /> {lender?.name || 'N/A'}</td>
                  <td><FaPhone /> {lender?.contact || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <p>No bookings yet.</p>
          <button className="btn btn-primary" onClick={() => navigate('/disEquip')}>
            Browse Equipment
          </button>
        </div>
      )}
    </div>
  );
}

export default MyBooking;