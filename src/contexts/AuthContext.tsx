import React, { createContext, useState } from 'react';
import { signIn as signInApi, register as registerApi } from '../apis';

interface AuthContextInterface {
    token: string,
    signIn: any,
    signOut: any,
    register: any,
    loading: boolean
  }
const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const signIn = async (username: string, password: string, callback: () => void) => {
    setLoading(true);
    const response = await signInApi(username, password);
    console.log('response', response);

    if (response && response.auth_token) {
      localStorage.setItem('token', response.auth_token);
      setToken(response.auth_token);
      callback();
    }
    setLoading(false);
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  const register = async (username: string, password: string, callback: () => void) => {
    setLoading(true);
    const response = await registerApi(username, password);
    if (response && response.id) {
      callback();
    }
    setLoading(false);
  };

  const value = {
    token,
    loading,
    signIn,
    signOut,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
