import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { FaTractor, FaUpload, FaRupeeSign, FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from '../components/navbar';
import '../styles/AddEquip.css';

function AddEquip({ darkMode }) {
  const [equipInfo, setEquipInfo] = useState({
    type: '',
    name: '',
    pricePerDay: '',
    location: '',
    image: null,
    imagePreview: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      const file = files[0];
      setEquipInfo(prev => ({ 
        ...prev, 
        image: file,
        imagePreview: file ? URL.createObjectURL(file) : null
      }));
    } else {
      setEquipInfo(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddEquip = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { type, name, pricePerDay, location, image } = equipInfo;
    const lenderId = localStorage.getItem('userId');

    if (!type || !name || !pricePerDay || !location || !image || !lenderId) {
      setIsSubmitting(false);
      return handleError('All fields are required');
    }

    try {
      const formData = new FormData();
      formData.append('type', type);
      formData.append('name', name);
      formData.append('pricePerDay', pricePerDay);
      formData.append('location', location);
      formData.append('Lender', lenderId);
      formData.append('image', image);

      const response = await fetch('http://localhost:5000/protected/addEquipment', {
        headers: {
          'Authorization': localStorage.getItem('token')
        },
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (result.success) {
        handleSuccess(result.message);
        setTimeout(() => navigate('/home'), 1500);
      } else {
        handleError(result.error || result.message);
      }
    } catch (err) {
      handleError(err.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`add-equip-page ${darkMode ? 'dark' : ''}`}>
      <Navbar darkMode={darkMode} />
      <div className='add-equip-container'>
        <div className='add-equip-card'>
          <div className='form-header'>
            <h1><FaTractor className="header-icon" /> Add Equipment</h1>
            <p>List your agricultural equipment for rent</p>
          </div>

          <form className='add-equip-form' onSubmit={handleAddEquip}>
            <div className='form-row'>
              {/* Image Preview */}
              <div className='image-upload-container'>
                <div className='image-preview'>
                  {equipInfo.imagePreview ? (
                    <img src={equipInfo.imagePreview} alt="Equipment preview" />
                  ) : (
                    <div className='image-placeholder'>
                      <FaUpload className='upload-icon' />
                      <span>Equipment Image</span>
                    </div>
                  )}
                </div>
                <label className='file-upload-btn'>
                  <input
                    type='file'
                    name='image'
                    accept='image/*'
                    onChange={handleChange}
                    required
                  />
                  Choose Image
                </label>
              </div>

              {/* Form Fields */}
              <div className='form-fields'>
                <div className='form-group'>
                  <label htmlFor='type'>Equipment Type</label>
                  <select
                    name='type'
                    value={equipInfo.type}
                    onChange={handleChange}
                    required
                  >
                    <option value=''>-- Select Type --</option>
                    <option value='tractor'>Tractor</option>
                    <option value='plough'>Plough</option>
                    <option value='seeder'>Seeder</option>
                    <option value='sprayer'>Sprayer</option>
                    <option value='harvester'>Harvester</option>
                    <option value='cultivator'>Cultivator</option>
                    <option value='irrigation Pump'>Irrigation Pump</option>
                  </select>
                </div>

                <div className='form-group'>
                  <label htmlFor='name'>Equipment Name</label>
                  <input
                    onChange={handleChange}
                    type='text'
                    name='name'
                    placeholder='e.g., John Deere 5050'
                    value={equipInfo.name}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='pricePerDay'>Daily Rate</label>
                  <div className='price-input'>
                    <FaRupeeSign className='currency-icon' />
                    <input
                      onChange={handleChange}
                      type='number'
                      name='pricePerDay'
                      placeholder='e.g., 1500'
                      value={equipInfo.pricePerDay}
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div className='form-group'>
                  <label htmlFor='location'>Location</label>
                  <div className='location-input'>
                    <FaMapMarkerAlt className='location-icon' />
                    <input
                      onChange={handleChange}
                      type='text'
                      name='location'
                      placeholder='e.g., Bengaluru, Karnataka'
                      value={equipInfo.location}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <button 
              type='submit' 
              className='submit-btn'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'List Equipment'}
            </button>
          </form>
        </div>
        <ToastContainer position="bottom-right" theme={darkMode ? 'dark' : 'light'} />
      </div>
    </div>
  );
}

export default AddEquip;