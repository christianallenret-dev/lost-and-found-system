// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem('id');
  const user = isAuthenticated ? JSON.parse(localStorage.getItem('user')) : null;

  return isAuthenticated ? React.cloneElement(children, { user }) : <Navigate to="/login" />;
}

export default PrivateRoute;
