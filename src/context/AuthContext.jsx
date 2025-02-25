import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [name, setName] = useState(() => {
    return localStorage.getItem("name") || sessionStorage.getItem("name") || null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || sessionStorage.getItem("token") || null;
  });
  const [role, setRole] = useState(() =>
    localStorage.getItem("role") || sessionStorage.getItem("role") || null
  );

  const login = (token, name, role, rememberMe) => {
    setToken(token);
    setName(name);
    setRole(role);
    console.log("In login function - isAdmin:", role);
    if (rememberMe) {
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      localStorage.setItem("role", role);
    } else {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("role", role);
    }
  };


  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("name");
    sessionStorage.removeItem("name");
    localStorage.removeItem("role");
    sessionStorage.removeItem("role");
  };

  const isLoggedIn = !!token;
  // const isAdmin = role === true;
  const isAdmin = role === "true" || role === true;


  return (
    <AuthContext.Provider value={{ name, token, isLoggedIn, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
