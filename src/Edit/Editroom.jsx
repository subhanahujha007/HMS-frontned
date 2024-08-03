import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditRoom = () => {
  const { id } = useParams(); // Fetch room ID from the URL parameters
  const navigate = useNavigate(); // To navigate programmatically
  const [roomNumber, setRoomNumber] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [isOperational, setIsOperational] = useState('operational'); // Default to 'operational'
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Fetch room details when component mounts
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/api/rooms/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          const { room } = response.data;
          setRoomNumber(room.roomNumber);
          setFloorNumber(room.floorNumber);
          setIsOperational(room.isOperational);
        }
      } catch (err) {
        setError('An error occurred while fetching room details.');
        console.error('Fetch room error:', err);
      }
    };

    fetchRoom();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8001/api/rooms/update/${id}`, {
        roomNumber,
        floorNumber,
        isOperational,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setSuccess('Room updated successfully!');
        navigate('/room-management'); // Redirect to the room management page
      }
    } catch (err) {
      setError('An error occurred while updating the room.');
      console.error('Update room error:', err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto min-h-[80vh] bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Room</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
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
          <label htmlFor="isOperational" className="text-lg font-medium mb-1">Room Status:</label>
          <select
            id="isOperational"
            value={isOperational}
            onChange={(e) => setIsOperational(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="operational">Operational</option>
            <option value="non-operational">Non-operational</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Room
        </button>
      </form>
    </div>
  );
};

export default EditRoom;
