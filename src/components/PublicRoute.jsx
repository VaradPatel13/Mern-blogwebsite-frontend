import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ProtectedRoute = () => {
  // Use the same cookie name you set in your Login Page
  const [cookies] = useCookies(['accessToken']);
  
  // Check if the isLoggedIn cookie exists.
  // The !! converts the value to a boolean, which is true if the cookie has any value.
  const isAuthenticated = !!cookies.isLoggedIn;

  // If the user is authenticated, render the child route via Outlet.
  // If not, redirect them to the login page.
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;