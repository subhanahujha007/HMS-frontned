import React, { useState } from 'react';
import axios from 'axios';

const AddBed = () => {
  const [roomNumber, setRoomNumber] = useState('');
  const [bedNumber, setBedNumber] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [status, setStatus] = useState('available'); // Default status

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8001/api/beds/add', {
        roomNumber,
        bedNumber,
        floorNumber,
        status,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true, // This will send cookies with the request
      });

      if (response.status === 201) {
        alert('Bed added successfully!');
        // Optionally reset the form fields
        setRoomNumber('');
        setBedNumber('');
        setFloorNumber('');
        setStatus('available');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred while adding the bed.';
      alert(errorMessage);
      console.error('Add bed error:', err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Bed</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="roomNumber" className="text-lg font-medium mb-1">Room Number:</label>
          <input
            type="text"
            id="roomNumber"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            placeholder="Enter room number"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="bedNumber" className="text-lg font-medium mb-1">Bed Number:</label>
          <input
            type="text"
            id="bedNumber"
            value={bedNumber}
            onChange={(e) => setBedNumber(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            placeholder="Enter bed number"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="floorNumber" className="text-lg font-medium mb-1">Floor Number:</label>
          <input
            type="text"
            id="floorNumber"
            value={floorNumber}
            onChange={(e) => setFloorNumber(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            placeholder="Enter floor number"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="status" className="text-lg font-medium mb-1">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            required
          >
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Bed
        </button>
      </form>
    </div>
  );
};

export default AddBed;
