import { Plus } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');

  // Fetch rooms on component mount
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/rooms', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          setRooms(response.data.rooms); // Assuming the response contains an array of rooms
        }
      } catch (err) {
        setError('An error occurred while fetching rooms.');
        console.error('Fetch rooms error:', err);
      }
    };

    fetchRooms();
  }, []);

  // Filter rooms based on the selected filter
  const filteredRooms = rooms.filter(room => {
    if (filter === 'All') return true;
    return filter === 'operational' ? room.isOperational === 'operational' : room.isOperational === 'non-operational';
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/api/rooms/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      setRooms(rooms.filter(room => room._id !== id));
    } catch (err) {
      setError('An error occurred while deleting the room.');
      console.error('Delete room error:', err);
    }
  };

  const handleEdit = (id) => {
    // Redirect to edit page with room ID
    window.location.href = `/editroom/${id}`;
  };

  return (
    <div className='min-h-[80vh]'>
      <center>
        <h1 className='font-bold text-[50px] mx-auto' style={{ backgroundColor: "grey" }}>
          This is the dashboard for room management
        </h1>
        <div className='flex gap-4 items-center flex-col' style={{ backgroundColor: "beige", width: "300px" }}>
          <p>Total no of rooms: {rooms.length}</p>
          <p>Rooms which are operational: {rooms.filter(room => room.isOperational === 'operational').length}</p>
          <p>Rooms which are non-operational: {rooms.filter(room => room.isOperational === 'non-operational').length}</p>
          <button className='w-[70%] gap-4 flex flex-row bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'>
            <Link to="/addroom">
              Add a new room
            </Link>
            <Plus />
          </button>
        </div>
      </center>
      <div className='mt-4'>
        <label htmlFor="beds">Sort rooms by operability:</label>
        <select
          id="beds"
          name="beds"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className='ml-2'
        >
          <option value="operational">Operational</option>
          <option value="non-operational">Non-operational</option>
          <option value="All">All</option>
        </select>
      </div>
      <div className='mt-8 flex flex-wrap gap-4'>
        <h2 className='text-2xl font-bold mb-4 w-full'>Room List</h2>
        {filteredRooms.length > 0 ? (
          filteredRooms.map(room => (
            <div key={room._id} className='bg-beige border p-4 rounded flex flex-col w-80'>
              <p><strong>Room Number:</strong> {room.roomNumber}</p>
              <p><strong>Floor Number:</strong> {room.floorNumber}</p>
              <p><strong>Status:</strong> {room.isOperational === 'operational' ? 'Operational' : 'Non-operational'}</p>
              <div className='mt-2 flex gap-2'>
                <button
                  onClick={() => handleEdit(room._id)}
                  className='bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600'
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(room._id)}
                  className='bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600'
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No rooms found.</p>
        )}
      </div>
    </div>
  );
};

export default RoomManagement;
