import React, { createContext, useContext, useState } from 'react';

// Crea un contexto de autenticación
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [esAutenticado, setIsAuthenticated] = useState(localStorage.getItem("apiKey") !== null);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("apiKey");
    localStorage.removeItem("id");
  };

  return (
    <AuthContext.Provider value={{ esAutenticado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);

