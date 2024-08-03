
import React, { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi'; 
import { Link } from 'react-router-dom';
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    
    setIsOpen(!isOpen)};

  return (
// src/components/Sidebar.js

isOpen === true ?
(<div
  className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 z-40`}
  >
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">HMS</h1>
        <button onClick={toggleSidebar}  className="text-2xl">
          <HiX />
        </button>
      </div>
      <nav className="mt-6 flex flex-col justify-between">
        <ul>
          <li className="p-4 hover:bg-gray-700"><Link to="/room-management">room</Link></li>
          <li className="p-4 hover:bg-gray-700"><Link to="/bed-management">bed</Link></li>
          <li className="p-4 hover:bg-gray-700"><Link to="/patient-management">patient</Link></li>
        </ul>
         </nav>
    </div>):(
    <>
     <button onClick={toggleSidebar}  className="text-2xl">
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
    </>
  )
  )
};

export default Sidebar;
