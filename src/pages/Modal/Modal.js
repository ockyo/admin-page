import React from "react";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";

const Modal = ({ isOpen, onClose, modalType, formData, selectedUser, handleChange, handleSubmit }) => {
  if (!isOpen) return null; // Không render nếu modal không mở

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
        onClick={onClose}
      ></div>

      <div
        className="fixed inset-0 z-50 flex justify-center items-center"
        onClick={(e) => e.stopPropagation()} // Ngừng sự kiện click ra ngoài modal
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <button
            className="absolute top-3 right-3 text-gray-500"
            onClick={onClose}
          >
            X
          </button>
          
          {modalType === "add" ? (
            <AddUserModal
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          ) : (
            <EditUserModal
              formData={formData}
              selectedUser={selectedUser}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
