import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  // const [token, setToken] = useState(sessionStorage.getItem('accessToken') || null);
 const token= sessionStorage.getItem('accessToken') || null;
  const login = (userToken) => {
    setToken(userToken);
  };
  const logout = () => {
        sessionStorage.removeItem('accessToken');
  };
  // const isAuthenticated = !token;
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};