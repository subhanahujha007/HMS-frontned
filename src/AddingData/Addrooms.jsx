// src/components/AddRooms.js
import React, { useState } from 'react';

const AddRooms = () => {
  // State to store form input values
  const [roomName, setRoomName] = useState('');
  const [numberOfBeds, setNumberOfBeds] = useState('');
  const [floorNumber, setFloorNumber] = useState('');

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
    console.log('Room Name:', roomName);
    console.log('Number of Beds:', numberOfBeds);
    console.log('Floor Number:', floorNumber);
    
    // Reset form fields after submission
    setRoomName('');
    setNumberOfBeds('');
    setFloorNumber('');
  };

  return (
    <div className="p-4 max-w-md mx-auto min-h-[80vh] bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Room</h2>
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
          <label htmlFor="numberOfBeds" className="text-lg font-medium mb-1">Number of Beds:</label>
          <input
            type="number"
            id="numberOfBeds"
            value={numberOfBeds}
            onChange={(e) => setNumberOfBeds(e.target.value)}
            className="border border-gray-300 p-2 rounded appearance-none"
            placeholder="Enter number of beds"
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
            className="border border-gray-300 p-2 rounded appearance-none"
            placeholder="Enter floor number"
            required
          />
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
