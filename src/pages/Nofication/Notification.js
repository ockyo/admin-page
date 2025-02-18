// Notification.js
import React, { useEffect } from "react";

const Notification = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(); 
        }, 5000);
        return () => clearTimeout(timer); 
    }, [message, onClose]);

    return (
        <div
            className={`fixed top-5 right-5 px-6 py-3 rounded-md shadow-lg transition-transform transform ${
                type === "success" ? "bg-green-500" : "bg-red-500"
            } text-white`}
            style={{ zIndex: 1000 }}
        >
            <strong>{type === "success" ? "Success!" : "Error!"}</strong> {message}
        </div>
    );
};

export default Notification;
