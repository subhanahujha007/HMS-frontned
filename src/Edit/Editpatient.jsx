import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditPatient = () => {
  const { id } = useParams(); // Get patient ID from route parameters
  const navigate = useNavigate();

  // State to store form input values
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male'); // Default gender
  const [bed, setBed] = useState('');
  const [disease, setDisease] = useState('');
  const [floorno, setFloorno] = useState('');
  const [status, setStatus] = useState('admitted'); // Default status
  const [bedOptions, setBedOptions] = useState([]);
  const [error, setError] = useState('');
  const [patientData, setPatientData] = useState('');

  // Fetch patient data and available beds when component mounts
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/api/patient/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          const patientData = response.data;
          setPatientData(patientData);
          setName(patientData.name);
          setAge(patientData.age);
          setGender(patientData.gender);
          setBed(patientData.bed);
          setDisease(patientData.disease);
          setFloorno(patientData.floorno);
          setStatus(patientData.status);
        }
      } catch (error) {
        console.error('Error fetching patient data:', error.response ? error.response.data : error.message);
        setError('Failed to load patient data. Please try again later.');
      }
    };

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
          const availableBeds = response.data.beds.filter(bed => bed.status === 'available' || bed._id === bed);
          setBedOptions(availableBeds);
        }
      } catch (error) {
        console.error('Error fetching beds:', error.response ? error.response.data : error.message);
        setError('Failed to load beds. Please try again later.');
      }
    };

    fetchPatientData();
    fetchBeds();
  }, [id]);

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === 'admitted' && (bed === '' || bed === 'unassigned')) {
      // If the patient is being readmitted, ensure a bed is selected
      return setError('Please assign a new bed to the patient.');
    }

    try {
      const response = await axios.put(
        `http://localhost:8001/api/patient/${id}`,
        {
          name,
          age: parseInt(age),
          gender,
          bed,
          disease,
          floorno: parseInt(floorno),
          status
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
      console.log('Patient updated:', response.data);

      // Navigate to Patient Management page
      navigate('/patient-management'); // Update with actual route to Patient Management
    } catch (error) {
      console.error('Error updating patient:', error.response ? error.response.data : error.message);
      setError('Failed to update patient. Please try again later.');
    }
  };

  // Handler for status change
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    // If status is changed to 'admitted', clear the bed assignment
    if (newStatus === 'admitted') {
      setBed(''); // Clear bed selection when re-admitting
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-lg font-medium mb-1">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="age" className="text-lg font-medium mb-1">Age:</label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="gender" className="text-lg font-medium mb-1">Gender:</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="bed" className="text-lg font-medium mb-1">Bed:</label>
          <select
            id="bed"
            value={bed}
            onChange={(e) => setBed(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            disabled={status === 'discharged'}
          >
            <option value="" disabled>Select a bed</option>
            {bedOptions.map((bedOption) => (
              <option key={bedOption._id} value={bedOption._id}>
                {bedOption.bedNumber} (Floor: {bedOption.floorNumber})
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="disease" className="text-lg font-medium mb-1">Disease:</label>
          <input
            id="disease"
            type="text"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="floorno" className="text-lg font-medium mb-1">Floor Number:</label>
          <input
            id="floorno"
            type="number"
            value={floorno}
            onChange={(e) => setFloorno(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="status" className="text-lg font-medium mb-1">Status:</label>
          <select
            id="status"
            value={status}
            onChange={handleStatusChange}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="admitted">Admitted</option>
            <option value="discharged">Discharged</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Patient
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default EditPatient;
