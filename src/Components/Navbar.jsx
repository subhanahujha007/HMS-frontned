// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const Navbar = () => {
  return (
    <div className='flex min-h-full flex-row justify-between px-3 py-1'>
      <div className='flex gap-10'>
        <Sidebar />
        <button className='text-2xl'>
          <Link to="/">HMS</Link>
        </button>
      </div>

      <div className='gap-10 flex flex-row'>
        <button className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'>
          <Link to="/login">Log In</Link>
        </button>
        <button className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'>
          <Link to="/signup">Sign Up</Link>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
