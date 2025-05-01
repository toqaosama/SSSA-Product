import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import authApi from '../api/authApi';
import LoadingOverlay from '../Shared/LoadingOverlay';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem('token') || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Initially set loading to true

  const setAuthToken = useCallback((newToken) => {
    setToken(newToken);
    sessionStorage.setItem('token', newToken);
  }, []);

  const removeAuthToken = useCallback(() => {
    setToken(null);
    setUser(null); // Ensure user is also cleared on logout
    sessionStorage.removeItem('token');
  }, []);

  const loadUser = useCallback(async () => {
    if (token) {
      try {
        const response = await authApi.get('auth/user');
        if (response.status === 200) {
          const userData = await response.data;
          setUser(userData.user);
          console.log('User loaded:', userData.user);
        } else {
          console.log('Failed to load user (non-200 status), removing token.');
          removeAuthToken();
        }
      } catch (error) {
        console.error('Failed to load user:', error);
        removeAuthToken();
      }
    }
    setLoading(false); // Set loading to false regardless of success or failure
  }, [token, removeAuthToken]);

  const isAuthenticated = useCallback(() => {
    return !!user;
  }, [user]);

  const isAdmin = useCallback(() => {
    return user?.role === 'admin'; // Use optional chaining to avoid errors if user is null
  }, [user]);

  useEffect(() => {
    loadUser();
  }, [token, loadUser]);

  // Ensure LoadingOverlay is shown during the initial load
  if (loading) {
    return <LoadingOverlay />;
  }

  return (
      <AuthContext.Provider value={{ token, setAuthToken, removeAuthToken, user, loading, isAuthenticated, isAdmin }}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);