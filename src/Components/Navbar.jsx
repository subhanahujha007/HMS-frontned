// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Navbar = () => {
  const token = localStorage.getItem('refreshToken');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the refresh token from localStorage
    localStorage.removeItem('refreshToken');
    // Optionally redirect the user after logging out
    navigate('/');
  };

  return (
    <div className='flex min-h-full flex-row justify-between px-3 py-1'>
      <div className='flex gap-10'>
        <Sidebar />
        <button className='text-2xl'>
          <Link to="/">HMS</Link>
        </button>
      </div>

      {token ? (
        <div className='gap-10 flex flex-row'>
          <button 
            onClick={handleLogout} 
            className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className='gap-10 flex flex-row'>
          <button className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'>
            <Link to="/login">Log In</Link>
          </button>
          <button className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'>
            <Link to="/signup">Sign Up</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
