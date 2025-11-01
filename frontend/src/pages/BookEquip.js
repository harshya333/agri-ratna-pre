import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';
import {
  FaTractor,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSearch,
} from 'react-icons/fa';
import Navbar from '../components/navbar';
import '../styles/DisEquip.css';

function EquipmentsList({ darkMode }) {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  // ✅ Fetch all equipments
  const fetchEquipments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        handleError('Unauthorized: Please login first.');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5000/protected/allEquipments', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // ✅ Proper Bearer token format
        },
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setEquipments(result.data || []);
      } else {
        handleError(result.message || 'Failed to fetch equipments');
      }
    } catch (err) {
      handleError(err.message || 'Failed to load equipments');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle booking
  const handleBookEquip = async (equipId, lenderId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        handleError('Unauthorized: Please login first.');
        return;
      }

      const response = await fetch('http://localhost:5000/protected/bookEquipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // ✅ Fix token format
        },
        body: JSON.stringify({ equipId, userId, lenderId }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        handleSuccess(result.message || 'Equipment booked successfully!');
        setTimeout(() => navigate('/home'), 1500);
      } else {
        handleError(result.message || 'Booking failed');
      }
    } catch (err) {
      handleError(err.message || 'Something went wrong');
    }
  };

  // ✅ Filter equipments based on search and type
  const filteredEquipments = equipments.filter((equip) => {
    const name = equip.name?.toLowerCase() || '';
    const type = equip.type?.toLowerCase() || '';
    const matchesSearch =
      name.includes(searchTerm.toLowerCase()) || type.includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || equip.type === selectedType;
    return matchesSearch && matchesType;
  });

  // ✅ Generate dropdown types dynamically
  const equipmentTypes = ['all', ...new Set(equipments.map((equip) => equip.type))];

  useEffect(() => {
    fetchEquipments();
  }, []);

  return (
    <div className={`equipments-page ${darkMode ? 'dark' : ''}`}>
      <Navbar darkMode={darkMode} />

      <div className="equipments-container">
        {/* Header */}
        <div className="page-header">
          <h1>
            <FaTractor className="header-icon" /> Available Equipment
          </h1>
          <p>Browse and book agricultural equipment for your needs</p>
        </div>

        {/* Filters */}
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
            {equipmentTypes.map((type) => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type}
              </option>
            ))}
          </select>
        </div>

        {/* Equipment Cards */}
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading equipment...</p>
          </div>
        ) : filteredEquipments.length > 0 ? (
          <div className="equipments-grid">
            {filteredEquipments.map((equip) => (
              <div
                className={`equip-card ${darkMode ? 'dark' : ''}`}
                key={equip._id}
              >
                <div className="equip-image">
                  <img
                    src={
                      equip.image
                        ? `http://localhost:5000/uploads/${equip.image}`
                        : 'https://via.placeholder.com/300x200?text=No+Image'
                    }
                    alt={equip.name}
                    onError={(e) => {
                      e.target.src =
                        'https://via.placeholder.com/300x200?text=Equipment+Image';
                    }}
                  />
                </div>

                <div className="equip-details">
                  <h3>{equip.name || 'Unnamed Equipment'}</h3>
                  <div className="equip-meta">
                    <span className="equip-type">{equip.type || 'Unknown Type'}</span>
                    <span className="equip-price">
                      <FaRupeeSign /> {equip.pricePerDay || 'N/A'}/day
                    </span>
                  </div>
                  <div className="equip-location">
                    <FaMapMarkerAlt className="location-icon" />{' '}
                    {equip.location || 'Unknown'}
                  </div>
                  <button
                    className="book-btn"
                    onClick={() => handleBookEquip(equip._id, equip.lenderId || equip.Lender)}
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
