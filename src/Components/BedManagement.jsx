import React, { useState, useEffect } from 'react';
import { Plus } from "lucide-react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const BedManagement = () => {
  const [beds, setBeds] = useState([]);
  const [error, setError] = useState('');
  const [selectedSort, setSelectedSort] = useState('All'); // Default sort option
  const navigate = useNavigate(); // For navigation
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchBeds = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/beds', {
          headers: {
            Authorization: `Bearer ${token}`,
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
  }, [token]);

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

  const handleDelete = async (bedId) => {
    try {
      await axios.delete(`http://localhost:8001/api/beds/${bedId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      setBeds(beds.filter(bed => bed._id !== bedId)); // Remove the bed from state
    } catch (err) {
      console.error('Delete bed error:', err);
      setError('An error occurred while deleting the bed.');
    }
  };

  const renderBeds = (sortedBeds) => {
    return (
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-300 w-[20%] text-center">Bed No.</th>
            <th className="px-4 py-2 border border-gray-300 w-[20%] text-center">Room No.</th>
            <th className="px-4 py-2 border border-gray-300 w-[20%] text-center">Floor No.</th>
            <th className="px-4 py-2 border border-gray-300 w-[20%] text-center">Status</th>
            <th className="px-4 py-2 border border-gray-300 w-[20%] text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedBeds.map((bed) => (
            <tr key={bed._id} className="border border-gray-300">
              <td className="px-4 py-2 text-center">{bed.bedNumber}</td>
              <td className="px-4 py-2 text-center">{bed.roomNumber}</td>
              <td className="px-4 py-2 text-center">{bed.floorNumber}</td>
              <td className={`px-4 py-2 text-center ${bed.status === 'occupied' ? 'text-red-500' : 'text-green-500'}`}>
                {bed.status}
              </td>
              <td className="px-4 py-2 text-center">
                <button
                  className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
                  onClick={() => navigate(`/editbed/${bed._id}`)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ml-2"
                  onClick={() => handleDelete(bed._id)}
                >
                  Delete
                </button>
              </td>
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
      <div className="flex gap-2 mb-4 justify-center">
        <label htmlFor="beds" className="mr-2">Sort Beds by Preference:</label>
        <select id="beds" name="beds" value={selectedSort} onChange={handleSortChange} className="border border-gray-300 p-2 rounded">
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
