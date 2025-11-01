import React, { useEffect, useState } from 'react';
import { handleError, handleSuccess } from '../utils';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSave } from 'react-icons/fa';
import Navbar from '../components/navbar';
import '../styles/EditProfile.css';

function EditProfile({ darkMode }) {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    contact: '',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/protected/editProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(profile)
      });

      const result = await response.json();
      if (result.success) {
        handleSuccess('Profile updated successfully!');
      } else {
        handleError(result.message);
      }
    } catch (err) {
      handleError(err.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInitial = () => {
    return profile.name ? profile.name.charAt(0).toUpperCase() : 'U';
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className={`edit-profile-page ${darkMode ? 'dark' : ''}`}>
      <Navbar darkMode={darkMode} />
      <div className="edit-profile-container">
        <div className="profile-header">
          <h1><FaUser className="header-icon" /> Edit Profile</h1>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="avatar-circle">
            <span className="avatar-initial">{getInitial()}</span>
          </div>

          <div className="form-group">
            <label htmlFor="name">
              <FaUser className="field-icon" /> Full Name
            </label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope className="field-icon" /> Email Address
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              disabled
              className="disabled-field"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact">
              <FaPhone className="field-icon" /> Contact Number
            </label>
            <input
              type="text"
              name="contact"
              value={profile.contact}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">
              <FaMapMarkerAlt className="field-icon" /> Location
            </label>
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              required
            />
          </div>

          <button 
            type="submit" 
            className="save-btn"
            disabled={isSubmitting}
          >
            <FaSave className="btn-icon" />
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;