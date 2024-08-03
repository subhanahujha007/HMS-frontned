import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditBed = () => {
  const { id } = useParams(); // Get the bed ID from the URL
  const navigate = useNavigate(); // For navigation
  const [bed, setBed] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    bedNumber: '',
    roomNumber: '',
    floorNumber: '',
    status: 'available'
  });

  useEffect(() => {
    const fetchBed = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/api/beds/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          setBed(response.data);
          setFormData({
            bedNumber: response.data.bedNumber,
            roomNumber: response.data.roomNumber,
            floorNumber: response.data.floorNumber,
            status: response.data.status,
          });
        }
      } catch (err) {
        setError('An error occurred while fetching bed details.');
        console.error('Fetch bed error:', err);
      }
    };

    fetchBed();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8001/api/beds/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      navigate('/bed-management'); // Redirect to bed management page on success
    } catch (err) {
      setError('An error occurred while updating the bed.');
      console.error('Update bed error:', err);
    }
  };

  if (!bed) return <p>Loading...</p>;

  return (
    <div className="min-h-[80vh] flex flex-col items-center">
      <h1 className="font-bold text-2xl mb-4">Edit Bed</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="bedNumber" className="block text-sm font-medium text-gray-700">Bed Number</label>
          <input
            type="text"
            id="bedNumber"
            name="bedNumber"
            value={formData.bedNumber}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700">Room Number</label>
          <input
            type="text"
            id="roomNumber"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="floorNumber" className="block text-sm font-medium text-gray-700">Floor Number</label>
          <input
            type="text"
            id="floorNumber"
            name="floorNumber"
            value={formData.floorNumber}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Update Bed
        </button>
      </form>
    </div>
  );
};

export default EditBed;
