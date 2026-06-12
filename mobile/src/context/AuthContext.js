import React, { createContext, useContext, useState } from 'react';
import { setAuthToken } from '../services/authToken';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  function login(authData) {
    // compat: permite login(user) antigo e login({ user, token }) novo
    if (authData && typeof authData === 'object' && 'user' in authData) {
      setUser(authData.user ?? null);
      setToken(authData.token ?? null);
      setAuthToken(authData.token ?? null);
      return;
    }

    setUser(authData ?? null);
    setToken(null);
    setAuthToken(null);
  }

  function logout() {
    setUser(null);
    setToken(null);
    setAuthToken(null);
  }

  function updateUser(dados) {
    setUser((prev) => ({ ...prev, ...dados }));
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
