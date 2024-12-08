// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { signin, getUserInfo } from '../api';
import type { UserProfileResponse } from '../api';

interface AuthContextType {
  user: UserProfileResponse | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfileResponse | null>(null);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Authenticate user and get token
      const { token } = await signin({ username, password });

      // Save token to localStorage
      localStorage.setItem('token', token);

      // Fetch user info with token
      const userData = await getUserInfo(token);

      // Update user state
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    // Remove token and reset user state
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    // Check for existing token on component mount
    const token = localStorage.getItem('token');
    if (token) {
      getUserInfo(token)
        .then((userData) => setUser(userData))
        .catch((error) => {
          console.error('Failed to fetch user info:', error);
          localStorage.removeItem('token');
          setUser(null);
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuth must be used within an AuthProvider');
  return context;
};