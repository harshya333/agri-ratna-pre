import React, { useEffect, useState } from 'react';
import { handleError } from '../utils';
import { FaUser, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

import '../styles/DashComp.css';

function Profile({ darkMode }) {
  const [profile, setProfile] = useState(null);
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/protected/profile', {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });

      const result = await response.json();

      if (result.success) {
        setProfile(result.data);
      } else {
        handleError(result.message);
      }
    } catch (err) {
      handleError(err.message || 'Failed to load profile');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className={`card profile-card ${darkMode ? 'dark' : ''}`}>
      <div className="profile-container">
        {/* Avatar Section */}
        <div className="avatar-section">
          <div className="avatar-circle">
            {profile?.image ? (
              <img
                src={`http://localhost:5000/uploads/${profile.image}`}
                alt="Profile"
                className={`avatar-image ${avatarLoaded ? 'loaded' : ''}`}
                onLoad={() => setAvatarLoaded(true)}
                onError={(e) => {
                  e.target.style.display = 'none';
                  setAvatarLoaded(false);
                }}
              />
            ) : null}
            {(!profile?.image || !avatarLoaded) && (
              <div className="avatar-initials">
                {profile ? getInitials(profile.name) : '--'}
              </div>
            )}
          </div>
          <div className="avatar-pulse"></div>
        </div>

        {/* Details Section */}
        <div className="details-section">
          <div className="profile-header">
            <h2 className="section-title">
              <FaUser className="icon" /> My Profile
            </h2>
            
          </div>

          {profile ? (
            <div className="profile-details">
              <div className="profile-field">
                <FaUser className="field-icon" />
                <div>
                  <label>Name</label>
                  <p className="profile-name">{profile.name}</p>
                </div>
              </div>
              
              <div className="profile-field">
                <FaPhone className="field-icon" />
                <div>
                  <label>Contact</label>
                  <p>{profile.contact || 'Not provided'}</p>
                </div>
              </div>
              
              <div className="profile-field">
                <FaMapMarkerAlt className="field-icon" />
                <div>
                  <label>Location</label>
                  <p>{profile.location || 'Not provided'}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading profile...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;