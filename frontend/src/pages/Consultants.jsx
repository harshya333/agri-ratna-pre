import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { ToastContainer } from 'react-toastify';
import { handleError } from '../utils';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import '../styles/Consultants.css';

function Consultants() {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          handleError('Unauthorized: Please log in first.');
          setLoading(false);
          return;
        }

        const res = await fetch('http://localhost:5000/protected/consultants', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setConsultants(data.data || []);
        } else {
          handleError(data.message || 'Failed to fetch consultants');
        }
      } catch (err) {
        handleError(err.message || 'Error fetching consultants');
      } finally {
        setLoading(false);
      }
    };

    fetchConsultants();
  }, []);

  const handleCall = (phone) => {
    if (phone) {
      window.open(`tel:${phone}`, '_self');
    } else {
      handleError('Phone number not available');
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">Loading consultants...</div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="consultants-container">
        <h2 className="consultants-title">🌿 Our Expert Consultants 🌿</h2>

        {consultants.length === 0 ? (
          <p className="no-consultants">No consultants available yet.</p>
        ) : (
          <div className="consultants-grid">
            {consultants.map((consultant) => (
              <div key={consultant._id} className="consultant-card">
                <div className="consultant-image-container">
                  <img
                    src={
                      consultant.imageUrl
                        ? `http://localhost:5000${consultant.imageUrl}`
                        : 'https://via.placeholder.com/300x200'
                    }
                    alt={consultant.userId?.name || 'Consultant'}
                  />

                </div>

                <div className="consultant-info">
                  <h3>{consultant.userId?.name || 'Unknown'}</h3>
                  <p className="bio">{consultant.bio || 'No bio available.'}</p>

                  <p className="specialties">
                    <strong>Specialties:</strong>{' '}
                    {Array.isArray(consultant.specialties)
                      ? consultant.specialties.join(', ')
                      : consultant.specialties || 'Not mentioned'}
                  </p>

                  <p className="fee">Consultation Fee: ₹{consultant.fee || 'N/A'}</p>

                  <div className="contact">
                    <p><FaEnvelope /> {consultant.userId?.email || 'Not available'}</p>
                    <p><FaPhone /> {consultant.userId?.contact || 'Not available'}</p>
                    <p><FaMapMarkerAlt /> {consultant.location || 'Unknown'}</p>
                  </div>

                  {/* ✅ Call Now Button */}
                  <button
                    className="call-btn"
                    onClick={() => handleCall(consultant.userId?.contact)}
                  >
                    <FaPhone className="call-icon" /> Call Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default Consultants;
