
// src/context/AuthContext.jsx (UPDATED)
// We now check for an existing session when the app loads.

import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Important for initial load

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await getCurrentUser();
        if (response.success) {
          setUser(response.data); // Set user if token is valid
        }
      } catch (error) {
        // If there's an error, it means the user is not logged in
        setUser(null);
      } finally {
        setLoading(false); // Stop loading once the check is complete
      }
    };

    verifyUser();
  }, []); // The empty dependency array ensures this runs only once on app load

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
  };

  // We don't render the app until the initial authentication check is done
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily access the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
