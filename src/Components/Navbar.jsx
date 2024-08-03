import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/inputSlice'; // Correct import path
import Sidebar from './Sidebar';
import axios from 'axios';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      
      // Make the API request to clear cookies
      await axios.post('http://localhost:8001/api/auth/logout', {}, {
        withCredentials: true, // Ensure cookies are sent with the request
      });

      // Clear tokens from localStorage
      localStorage.removeItem('authToken');

      // Dispatch logout action to Redux store
      dispatch(logout());

      // Redirect the user after logging out
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className='flex min-h-full flex-row justify-between px-3 py-1'>
      <div className='flex gap-10'>
        <Sidebar />
        <button className='text-2xl'>
          <Link to="/">HMS</Link>
        </button>
      </div>

      {isLoggedIn ? (
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
