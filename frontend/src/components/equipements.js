import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../utils';
import { FaTractor, FaRupeeSign, FaPlusCircle } from 'react-icons/fa';
import '../styles/DashComp.css'

function MyEquipments({ darkMode }) {
  const [userId, setUserId] = useState('');
  const [myEquipments, setMyEquipments] = useState([]);
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

  const fetchMyEquipments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/protected/myEquipments`, {
        headers: {
          'Authorization': localStorage.getItem('token'),
        },
      });
      const result = await response.json();
      setMyEquipments(result.data || []);
    } catch (err) {
      handleError(err.message);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchMyEquipments();
    }
  }, [userId]);

  return (
    <div className={`card ${darkMode ? 'dark' : ''}`}>
      <h2 className="section-title">
        <FaTractor className="icon" /> My Equipment
      </h2>

      {myEquipments.length > 0 ? (
        <div className="equipment-grid">
          {myEquipments.map((equip) => (
            <div className="equipment-card" key={equip._id}>
              <div className="equipment-image">
                <img
                  src={`http://localhost:5000/uploads/${equip.image}`}
                  alt={equip.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x150?text=Equipment+Image';
                  }}
                />
              </div>
              <div className="equipment-details">
                <h3>{equip.name}</h3>
                <p><strong>Type:</strong> {equip.type}</p>
                <p><strong>Price:</strong> <FaRupeeSign /> {equip.pricePerDay}/day</p>
                <p><strong>Status:</strong> {equip.availability ? 'Available' : 'Rented'}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No equipment added yet.</p>
          <button className="btn btn-primary" onClick={() => navigate('/addEquip')}>
            <FaPlusCircle /> Add Equipment
          </button>
        </div>
      )}
    </div>
  );
}

export default MyEquipments;