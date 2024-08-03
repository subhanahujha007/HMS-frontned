import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddRooms = () => {
  const [roomName, setRoomName] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [isOperational, setIsOperational] = useState('non-operational'); // Default value
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (roomName === '' || floorNumber === '') {
      setError('Please fill in all fields.');
      return;
    }
    setError('');

    try {
      const response = await axios.post('http://localhost:8001/api/rooms/add', {
        roomNumber: roomName,
        floorNumber,
        isOperational, // Include the operational status
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true, // This will send cookies with the request
      });

      if (response.status === 201) {
        setSuccess('Room added successfully!');
        setRoomName('');
        setFloorNumber('');
        setIsOperational('non-operational'); // Reset the status to default
        navigate("/room-management")
      }
    } catch (err) {
      setError('An error occurred while adding the room.');
      console.error('Add room error:', err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto min-h-[80vh] bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Room</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="roomName" className="text-lg font-medium mb-1">Room Name:</label>
          <input
            type="text"
            id="roomName"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            placeholder="Enter room name"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="floorNumber" className="text-lg font-medium mb-1">Floor Number:</label>
          <input
            type="number"
            id="floorNumber"
            value={floorNumber}
            onChange={(e) => setFloorNumber(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            placeholder="Enter floor number"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="isOperational" className="text-lg font-medium mb-1">Operational Status:</label>
          <select
            id="isOperational"
            value={isOperational}
            onChange={(e) => setIsOperational(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="operational">Operational</option>
            <option value="non-operational">Non-Operational</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Room
        </button>
      </form>
    </div>
  );
};

export default AddRooms;
