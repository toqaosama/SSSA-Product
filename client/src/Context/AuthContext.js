import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import authApi from '../api/authApi';
import LoadingOverlay from '../Shared/LoadingOverlay';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem('token') || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setAuthToken = useCallback((newToken) => {
    setToken(newToken);
    sessionStorage.setItem('token', newToken);
  }, []);

  const removeAuthToken = useCallback(() => {
    setToken(null);
    sessionStorage.removeItem('token');
  }, []);

  const loadUser = useCallback(async () => {
    if (token) {
      try {
        const response = await authApi.get('auth/user');
        if (response.status === 200) {
          const userData = await response.data;
          setUser(userData.user);
          console.log(userData.user);
        } else {
          removeAuthToken();
        }
      } catch (error) {
        console.error('Failed to load user:', error);
        removeAuthToken();
      }
    }
    setLoading(false);
  }, [token, removeAuthToken]);

  const isAuthenticated = useCallback(() => {
    return !!user;
  }, [user]); 

  useEffect(() => {
    loadUser();
  }, [token, loadUser]);

  if(loading) {
    return (
      <LoadingOverlay />
    )
  }
  
  return (
    <AuthContext.Provider value={{ token, setAuthToken, removeAuthToken, user, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
