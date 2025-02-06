import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [name, setName] = useState(()=> {
  return localStorage.getItem("name") || sessionStorage.getItem("name") || null;
});
const [token, setToken] = useState(() => {
  return localStorage.getItem("token") || sessionStorage.getItem("token") || null;
});

// Hàm đăng nhập
const login = (token, name, rememberMe) => {
  setToken(token);
  setName(name);
  console.log(name);
  if (rememberMe) {
    localStorage.setItem("token", token); // Lưu token vào localStorage nếu chọn Remember Me
    localStorage.setItem("name", name);
  } else {
    sessionStorage.setItem("token", token); // Lưu token vào sessionStorage nếu không chọn Remember Me
    sessionStorage.setItem("name", name);
  }
};

// Hàm đăng xuất
const logout = () => {
  setToken(null);
  localStorage.removeItem("token"); // Xóa token khỏi localStorage
  sessionStorage.removeItem("token"); // Xóa token khỏi sessionStorage
  localStorage.removeItem("name");
  sessionStorage.removeItem("name"); 
};
// Kiểm tra xem người dùng có đăng nhập hay không
const isLoggedIn = !!token;

return (
  <AuthContext.Provider value={{ name, token, isLoggedIn, login, logout }}>
    {children}
  </AuthContext.Provider>
);
};

export const useAuth = () => useContext(AuthContext);
