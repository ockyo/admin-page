import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
// import AccessDenied from "./AccessDinied";
import Swal from 'sweetalert2';

const ProtectedRoute = ({ children }) => {

  const { token } = useAuth();
  const { isAdmin } = useAuth();

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (token && !isAdmin) {
       console.log("Type of role:", typeof isAdmin);
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "You do not have permission to access this page!",
        confirmButtonText: "OK",
      }).then(() => {
        setShowAlert(true); // navigation after click OK
      });
    }
  }, [token, isAdmin]);

  if (!token || showAlert) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
