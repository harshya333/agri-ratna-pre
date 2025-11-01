import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { ToastContainer } from 'react-toastify';
import { handleError } from '../utils';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

function Consultants() {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
      const res = await fetch('http://localhost:5000/protected/consultants', {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
        const data = await res.json();
        if (data.success) {
          setConsultants(data.data); // ✅ use correct key
        } else {
          handleError('Failed to fetch consultants');
        }
      } catch (err) {
        handleError('Error fetching consultants');
      } finally {
        setLoading(false);
      }
    };
    fetchConsultants();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-10 text-lg font-semibold">
        Loading consultants...
      </div>
    );

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-6">Our Consultants</h2>
        {consultants.length === 0 ? (
          <p className="text-center text-gray-500">No consultants available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {consultants.map((consultant) => (
              <div
                key={consultant._id}
                className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition"
              >
                <img
                  src={consultant.imageUrl || 'https://via.placeholder.com/150'}
                  alt={consultant.userId?.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-semibold">
                    {consultant.userId?.name}
                  </h3>
                  <p className="text-gray-600">{consultant.bio}</p>
                  <p className="mt-2">
                    <strong>Specialties:</strong>{' '}
                    {Array.isArray(consultant.specialties)
                      ? consultant.specialties.join(', ')
                      : consultant.specialties}
                  </p>
                  <p className="mt-2 font-medium text-green-700">
                    Fee: ₹{consultant.fee}
                  </p>
                  <div className="mt-3 text-sm text-gray-700 space-y-1">
                    <p>
                      <FaEnvelope className="inline mr-1" />{' '}
                      {consultant.userId?.email}
                    </p>
                    <p>
                      <FaPhone className="inline mr-1" />{' '}
                      {consultant.userId?.contact}
                    </p>
                    <p>
                      <FaMapMarkerAlt className="inline mr-1" />{' '}
                      {consultant.location}
                    </p>
                  </div>
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
