import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPatient = () => {
  // State to store form input values
  const [patientName, setPatientName] = useState('');
  const [diseaseName, setDiseaseName] = useState('');
  const [age, setAge] = useState('');
  const [selectedBed, setSelectedBed] = useState('');
  const [gender, setGender] = useState('male'); // Default gender
  const [bedOptions, setBedOptions] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(''); // State for floor number
  const [error, setError] = useState('');

  // For navigation
  const navigate = useNavigate();

  // Fetch available beds when component mounts
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
          // Filter beds based on status being 'available'
          const availableBeds = response.data.beds.filter(bed => bed.status === 'available');
          setBedOptions(availableBeds); // Set only available beds
        }
      } catch (error) {
        console.error('Error fetching beds:', error.response ? error.response.data : error.message);
        setError('Failed to load beds. Please try again later.');
      }
    };

    fetchBeds();
  }, []);

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make POST request to create a new patient
      const response = await axios.post(
        'http://localhost:8001/api/patient/add',
        {
          name: patientName,
          age: parseInt(age),
          gender,
          bed: selectedBed,
          disease: diseaseName,
          floorno: selectedFloor // Include floor number
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      // Handle successful response
      console.log('Patient added:', response.data);

      // Reset form fields after submission
      setPatientName('');
      setDiseaseName('');
      setAge('');
      setSelectedBed('');
      setSelectedFloor('');
      setGender('male');

      // Navigate to Patient Management page
      navigate('/patient-management'); // Update with actual route to Patient Management
    } catch (error) {
      console.error('Error adding patient:', error.response ? error.response.data : error.message);
      setError('Failed to add patient. Please try again later.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="patientName" className="text-lg font-medium mb-1">Patient Name:</label>
          <input
            type="text"
            id="patientName"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            placeholder="Enter patient name"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="diseaseName" className="text-lg font-medium mb-1">Disease Name:</label>
          <input
            type="text"
            id="diseaseName"
            value={diseaseName}
            onChange={(e) => setDiseaseName(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            placeholder="Enter disease name"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="age" className="text-lg font-medium mb-1">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border border-gray-300 p-2 rounded appearance-none"
            placeholder="Enter age"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="bedSelection" className="text-lg font-medium mb-1">Allocate Bed:</label>
          <select
            id="bedSelection"
            value={selectedBed}
            onChange={(e) => {
              const selected = bedOptions.find(bed => bed._id === e.target.value);
              setSelectedBed(e.target.value);
              setSelectedFloor(selected ? selected.floorNumber : '');
            }}
            className="border border-gray-300 p-2 rounded"
            required
          >
            <option value="" disabled>Select a bed</option>
            {bedOptions.map((bed) => (
              <option key={bed._id} value={bed._id}>
                Bed No: {bed.bedNumber}, Room No: {bed.roomNumber}, Floor No: {bed.floorNumber}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="gender" className="text-lg font-medium mb-1">Gender:</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Patient
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default AddPatient;
