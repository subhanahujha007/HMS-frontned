import React, { useState, useEffect } from 'react';
import { Plus } from "lucide-react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const BedManagement = () => {
  const [beds, setBeds] = useState([]);
  const [error, setError] = useState('');
  const [selectedSort, setSelectedSort] = useState('All'); // Default sort option

  useEffect(() => {
    const fetchBeds = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/beds', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          setBeds(response.data.beds); // Assuming response contains an array of beds
        }
      } catch (err) {
        setError('An error occurred while fetching beds.');
        console.error('Fetch beds error:', err);
      }
    };

    fetchBeds();
  }, []);

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };

  const sortBeds = (bedsToSort, sortOption) => {
    switch (sortOption) {
      case 'occupied':
        return bedsToSort.filter((bed) => bed.status === 'occupied');
      case 'Unoccupied':
        return bedsToSort.filter((bed) => bed.status !== 'occupied');
      default:
        return bedsToSort;
    }
  };

  const renderBeds = (sortedBeds) => {
    return (
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-300">Bed No.</th>
            <th className="px-4 py-2 border border-gray-300">Room No.</th>
            <th className="px-4 py-2 border border-gray-300">Floor No.</th>
            <th className="px-4 py-2 border border-gray-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedBeds.map((bed) => (
            <tr key={bed.id} className="border border-gray-300">
              <td className="px-4 py-2">{bed.bedNumber}</td>
              <td className="px-4 py-2">{bed.roomNumber}</td>
              <td className="px-4 py-2">{bed.floorNumber}</td>
              <td className="px-4 py-2">{bed.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="min-h-[80vh]">
      <center>
        <h1 className="font-bold text-[50px] mx-auto" style={{ backgroundColor: "palegreen" }}>
          This is the dashboard for bed management
        </h1>
        <div className="flex gap-4 items-center flex-col" style={{ backgroundColor: "beige", width: "300px" }}>
          <p>Total No. of Beds: {beds.length}</p>
          <p>Beds Occupied: {sortBeds(beds, 'occupied').length}</p>
          <p>Empty Beds: {sortBeds(beds, 'Unoccupied').length}</p>
          <button className="w-[70%] gap-4 flex flex-row bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <Link to="/addbeds">Create a New Bed</Link> <Plus />
          </button>
        </div>
      </center>
      <div className="flex gap-2">
        <label htmlFor="beds">Sort Beds by Preference:</label>
        <select id="beds" name="beds" value={selectedSort} onChange={handleSortChange}>
          <option value="All">All</option>
          <option value="occupied">Occupied</option>
          <option value="Unoccupied">Unoccupied</option>
        </select>
      </div>
      {beds.length > 0 ? (
        renderBeds(sortBeds(beds, selectedSort))
      ) : (
        <p>No beds found.</p>
      )}
    </div>
  );
};

export default BedManagement;
