import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Hook để điều hướng
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json(); // Lấy dữ liệu từ API
      login(data.token, rememberMe); // Lưu token vào context hoặc localStorage
      navigate("/home"); // Điều hướng đến trang Home
    } catch (error) {
      setErrorMessage(error.message); // Hiển thị lỗi nếu có      
      alert("Login failed: " + error.message);
    }
  };
  return (
    <div className="text-center mt-48" >
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-5">
          <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={password}
            onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)} />
          </div>
          <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-300">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;




// // Mô phỏng API call
//     const mockApiResponse = async () => {
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           if (email === "user@example.com" && password === "password123") {
//             resolve({
//               token: "mock-jwt-token", // Token giả lập từ server
//             });
//           } else {
//             reject(new Error("Invalid credentials"));
//           }
//         }, 1000);
//       });
//     };

//     try {
//       const response = await mockApiResponse(); // Gọi API
//       login(response.token, rememberMe); // Lưu token
//       navigate("/home"); // Điều hướng đến trang Home
//     } catch (error) {
//       alert("Login failed: " + error.message);
//     }