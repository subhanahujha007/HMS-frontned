import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router-dom

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showAdmitted, setShowAdmitted] = useState(true); // Toggle for sorting
  const navigate = useNavigate();

  // Fetch all patients when component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/patient', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          setPatients(response.data); // Set patients data
          setFilteredPatients(response.data); // Initialize filtered patients
        }
      } catch (error) {
        console.error('Error fetching patients:', error.response ? error.response.data : error.message);
        setError('wow so empty.');
      }
    };

    fetchPatients();
  }, []);

  // Handle edit button click
  const handleEdit = (patientId) => {
    navigate(`/edit-patient/${patientId}`); // Navigate to edit patient page
  };

  // Handle delete button click
  const handleDelete = async (patientId) => {
    try {
      await axios.delete(`http://localhost:8001/api/patient/${patientId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      // Remove deleted patient from state
      setPatients(patients.filter(patient => patient._id !== patientId));
      setFilteredPatients(filteredPatients.filter(patient => patient._id !== patientId));
    } catch (error) {
      console.error('Error deleting patient:', error.response ? error.response.data : error.message);
      setError('Failed to delete patient. Please try again later.');
    }
  };

  // Toggle filter between admitted and discharged patients
  const handleToggleStatus = () => {
    setShowAdmitted(!showAdmitted);
    setFilteredPatients(patients.filter(patient => patient.status === (showAdmitted ? 'admitted' : 'discharged')));
  };

  // Calculate patient counts
  const totalPatients = patients.length;
  const admittedPatients = patients.filter(patient => patient.status === 'admitted').length;
  const dischargedPatients = patients.filter(patient => patient.status === 'discharged').length;

  return (
    <div className="p-4 max-w-7xl mx-auto bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Patient Management Dashboard</h2>

      <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-lg font-medium">
          <p>Total Patients: {totalPatients}</p>
          <p>Admitted Patients: {admittedPatients}</p>
          <p>Discharged Patients: {dischargedPatients}</p>
        </div>
        <button
          onClick={() => navigate('/addpatient')}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
        >
          Create New Patient
        </button>
      </div>

      <div className="mb-4">
        <button
          onClick={handleToggleStatus}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none"
        >
          {showAdmitted ? 'Show Discharged Patients' : 'Show Admitted Patients'}
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Bed No</th>
            <th className="border p-2">Room No</th>
            <th className="border p-2">Floor No</th>
            <th className="border p-2">Disease</th>
            <th className="border p-2">Admission Date</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map(patient => (
            <tr key={patient._id}>
              <td className="border p-2">{patient.name}</td>
              <td className="border p-2">
                {patient.bed ? patient.bed.bedNumber : 'N/A'}
              </td>
              <td className="border p-2">
                {patient.bed ? patient.bed.roomNumber : 'N/A'}
              </td>
              <td className="border p-2">
                {patient.floorno ? patient.floorno : 'N/A'}
              </td>
              <td className="border p-2">{patient.disease}</td>
              <td className="border p-2">{new Date(patient.admissionDate).toLocaleDateString()}</td>
              <td className="border p-2">{patient.status}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(patient._id)}
                  className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 focus:outline-none"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(patient._id)}
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 focus:outline-none ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientManagement;
