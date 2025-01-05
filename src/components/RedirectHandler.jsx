// src/components/RedirectHandler.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RedirectHandler = () => {
  const loggedIn = useSelector((state) => state.user.loggedIn);

  // Redirect based on login status
  return loggedIn ? <Navigate to="/quiz" replace /> : <Navigate to="/login" replace />;
};

export default RedirectHandler;
