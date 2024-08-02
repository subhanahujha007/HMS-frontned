// src/components/AddPatient.js
import React, { useState } from 'react';

const AddPatient = ({ availableBeds }) => {
  // State to store form input values
  const [patientName, setPatientName] = useState('');
  const [diseaseName, setDiseaseName] = useState('');
  const [age, setAge] = useState('');
  const [selectedBed, setSelectedBed] = useState('');

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
  
    
    // Reset form fields after submission
    setPatientName('');
    setDiseaseName('');
    setAge('');
    setSelectedBed('');
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
            onChange={(e) => setSelectedBed(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            required
          >
            <option value="" disabled>Select a bed</option>
          
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Patient
        </button>
      </form>
    </div>
  );
};

export default AddPatient;
