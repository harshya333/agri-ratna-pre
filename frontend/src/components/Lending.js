import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../utils';
import { FaTools, FaRupeeSign, FaUser, FaPhone } from 'react-icons/fa';
import '../styles/DashComp.css'


function MyLending({ darkMode }) {
  const [userId, setUserId] = useState('');
  const [myLending, setMyLending] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const fetchMyLending = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/protected/myLending`, {
        headers: {
          'Authorization': localStorage.getItem('token'),
        },
      });
      const result = await response.json();
      setMyLending(result.data || []);
    } catch (err) {
      handleError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchMyLending();
    }
  }, [userId]);

  

  return (
    <div className={`card ${darkMode ? 'dark' : ''}`}>
      <div className="section-header">
        <h2 className="section-title">
          <FaTools className="icon" /> My Lendings
        </h2>
        
      </div>

      {loading ? (
        <div className="loading-state">
          <p>Loading your lending history...</p>
        </div>
      ) : myLending.length > 0 ? (
        <div className="table-container">
          <table className="lendings-table">
            <thead>
              <tr>
                <th>Equipment</th>
                <th>Type</th>
                <th>Price/Day</th>
                <th>Borrower</th>
                <th>Contact</th>
                
              </tr>
            </thead>
            <tbody>
              {myLending.map(({ equipment, borrower }, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="equipment-info">
                      {equipment?.image && (
                        <img 
                          src={`http://localhost:5000/uploads/${equipment.image}`} 
                          alt={equipment.name}
                          className="equipment-thumbnail"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/50x50?text=Equipment';
                          }}
                        />
                      )}
                      <span>{equipment?.name || 'N/A'}</span>
                    </div>
                  </td>
                  <td>{equipment?.type || 'N/A'}</td>
                  <td className="price-cell">
                    <FaRupeeSign /> {equipment?.pricePerDay || 'N/A'}
                  </td>
                  <td>
                    <FaUser /> {borrower?.name || 'N/A'}
                  </td>
                  <td>
                    <FaPhone /> {borrower?.contact || 'N/A'}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <p>No lending history yet.</p>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate('/addEquip')}
          >
            Add Equipment to Lend
          </button>
        </div>
      )}
    </div>
  );
}

export default MyLending;