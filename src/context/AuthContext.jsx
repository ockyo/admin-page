import React, { createContext, useContext, useState  } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || sessionStorage.getItem("token") || null;
  });

  // Hàm đăng nhập
  const login = (token, rememberMe) => {
    setToken(token);

    if (rememberMe) {
      localStorage.setItem("token", token); // Lưu token vào localStorage nếu chọn Remember Me
    } else {
      sessionStorage.setItem("token", token); // Lưu token vào sessionStorage nếu không chọn Remember Me
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token"); // Xóa token khỏi localStorage
    sessionStorage.removeItem("token"); // Xóa token khỏi sessionStorage
  };
  // Kiểm tra xem người dùng có đăng nhập hay không
  const isLoggedIn = !!token;
  return (
    <AuthContext.Provider value={{ token, isLoggedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
