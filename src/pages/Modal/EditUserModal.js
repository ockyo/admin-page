import React from 'react';

const EditUserModal = ({ formData, selectedUser, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="username" className="block mb-2">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={formData.username || selectedUser.userName}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="idTiktok" className="block mb-2">ID TikTok</label>
        <input
          type="text"
          name="idTiktok"
          placeholder="Enter ID TikTok"
          value={formData.idTiktok || selectedUser.idTiktok}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Status</label>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive !== undefined ? formData.isActive : selectedUser.isActive}
            onChange={handleChange}
            className="mr-2"
          />
          <span>{formData.isActive !== undefined ? (formData.isActive ? 'Active' : 'Inactive') : (selectedUser.isActive ? 'Active' : 'Inactive')}</span>
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditUserModal;
