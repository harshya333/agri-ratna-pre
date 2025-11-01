import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';
import { FaTractor, FaRupeeSign, FaMapMarkerAlt, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import Navbar from '../components/navbar';
import '../styles/DisEquip.css';

function EquipmentsList({ darkMode }) {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const fetchEquipments = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/protected/allEquipments', {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });

      const result = await response.json();

      if (result.success) {
        setEquipments(result.data);
      } else {
        handleError(result.message);
      }
    } catch (err) {
      handleError(err.message || 'Failed to load equipments');
    } finally {
      setLoading(false);
    }
  };

  const handleBookEquip = async (equipId, lenderId) => {
    try {
      const response = await fetch('http://localhost:5000/protected/bookEquipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({ equipId, userId, lenderId })
      });

      const result = await response.json();
      const { success, message, error } = result;
      
      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate('/home'), 1500);
      } else {
        handleError(error || message);
      }
    } catch (err) {
      handleError(err.message || 'Something went wrong');
    }
  };

  const filteredEquipments = equipments.filter(equip => {
    const matchesSearch = equip.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         equip.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || equip.type === selectedType;
    return matchesSearch && matchesType;
  });

  const equipmentTypes = ['all', ...new Set(equipments.map(equip => equip.type))];

  useEffect(() => {
    fetchEquipments();
  }, []);

  return (
    <div className={`equipments-page ${darkMode ? 'dark' : ''}`}>
      <Navbar darkMode={darkMode} />
      <div className="equipments-container">
        <div className="page-header">
          <h1><FaTractor className="header-icon" /> Available Equipment</h1>
          <p>Browse and book agricultural equipment for your needs</p>
        </div>

        <div className="filters-container">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="type-filter"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {equipmentTypes.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading equipment...</p>
          </div>
        ) : filteredEquipments.length > 0 ? (
          <div className="equipments-grid">
            {filteredEquipments.map((equip) => (
              <div className={`equip-card ${darkMode ? 'dark' : ''}`} key={equip._id}>
                <div className="equip-image">
                  <img
                    src={`http://localhost:5000/uploads/${equip.image}`}
                    alt={equip.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Equipment+Image';
                    }}
                  />
                </div>
                <div className="equip-details">
                  <h3>{equip.name}</h3>
                  <div className="equip-meta">
                    <span className="equip-type">{equip.type}</span>
                    <span className="equip-price">
                      <FaRupeeSign /> {equip.pricePerDay}/day
                    </span>
                  </div>
                  <div className="equip-location">
                    <FaMapMarkerAlt className="location-icon" />
                    {equip.location}
                  </div>
                  <button 
                    className="book-btn"
                    onClick={() => handleBookEquip(equip._id, equip.Lender)}
                  >
                    <FaCalendarAlt className="btn-icon" /> Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No equipment found matching your criteria.</p>
            <button 
              className="btn btn-primary" 
              onClick={() => {
                setSearchTerm('');
                setSelectedType('all');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
      <ToastContainer position="bottom-right" theme={darkMode ? 'dark' : 'light'} />
    </div>
  );
}

export default EquipmentsList;