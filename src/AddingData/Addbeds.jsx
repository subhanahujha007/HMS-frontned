// src/components/AddBed.js
import React, { useState } from 'react';

const AddBed = ({ rooms, floors }) => {
  // State to store form input values
  const [bedNumber, setBedNumber] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
    if (!bedNumber || !selectedRoom || !selectedFloor) {
      alert('Please fill in all fields.');
      return;
    }
    // Check if bed number is unique
    if (bedNumbers.includes(bedNumber)) {
      alert('Bed number must be unique.');
      return;
    }

    console.log('Bed Number:', bedNumber);
    console.log('Room:', selectedRoom);
    console.log('Floor:', selectedFloor);
    
    // Reset form fields after submission
    setBedNumber('');
    setSelectedRoom('');
    setSelectedFloor('');
  };

  // Sample bed numbers (This should come from your data source)
  const [bedNumbers, setBedNumbers] = useState(['Bed 1', 'Bed 2']); // Example bed numbers

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Bed</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <label htmlFor="roomSelection" className="text-lg font-medium mb-1">Room:</label>
          <select
            id="roomSelection"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            required
          >
            <option value="" disabled>Select a room</option>
           
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="floorSelection" className="text-lg font-medium mb-1">Floor:</label>
          <select
            id="floorSelection"
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            required
          >
            <option value="" disabled>Select a floor</option>
            
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
