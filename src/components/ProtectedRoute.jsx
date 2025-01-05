// src/components/ProtectedRoute.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logout } from '../store/actions/userActions';

const ProtectedRoute = ({ children, redirect, onlyLoggedIn, onlyAuthenticated }) => {
  const { loggedIn, token, userID } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Log values for debugging
  console.log("ProtectedRoute Props:", { loggedIn, token, userID, redirect });

  // Define user types
  const isGuest = loggedIn && !token && userID === null;
  const isAuthenticatedUser = loggedIn && token;

  // Case 1: Non-logged-in visitors
  if (!loggedIn && onlyLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Case 2: Guests should not access authenticated-only routes
  if (isGuest && onlyAuthenticated) {
    return <Navigate to="/quiz" replace />;
  }

  // Case 3: Redirect logged-in users away from login/register
  if (redirect && loggedIn) {
    if (isGuest) dispatch(logout()); // Explicit logout for guests
    return <Navigate to="/quiz" replace />;
  }

  // Render the children if no redirection is needed
  return children;
};

export default ProtectedRoute;
