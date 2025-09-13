import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';
import { login as apiLogin } from '../utils/api';

interface AuthContextProps {
  children?: JSX.Element;
}

interface AuthContext {
  signin: (credentials: any) => Promise<any>;
  currentUser: any | null;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

export function useAuth(): AuthContext {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthContextProps): JSX.Element {
  const [currentUser, setCurrentUser] = useState<any | null>(() => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!currentUser);

  const signin = async (credentials: any) => {
    const { access_token, refresh_token } = await apiLogin(credentials);
    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('refreshToken', refresh_token);
    // You might want to fetch the user profile here and set it to currentUser
    // For now, we'll just set a dummy user
    const user = { email: credentials.email };
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
    setIsAuthenticated(true);
    return user;
  };

  const logout = async (): Promise<void> => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  const value: AuthContext = { currentUser, logout, isAuthenticated, signin };
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
