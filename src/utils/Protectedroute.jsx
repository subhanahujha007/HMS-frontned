// src/components/ProtectedRoute.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  // Use Redux to get the authentication state
  const { isLoggedIn } = useSelector((state) => state.auth);

  // Check if the user is logged in
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
