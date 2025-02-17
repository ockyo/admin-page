import React from 'react';

const AddUserModal = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold">CREATE NEW USER FOR ACTION APP</h2>
      </div>

      <input
        type="text"
        name="username"
        placeholder="Enter username"
        onChange={handleChange}
        value={formData.username}
        className="border p-2 w-full mb-4"
      />

      <input
        type="password"
        name="password"
        placeholder="Enter password"
        onChange={handleChange}
        value={formData.password}
        className="border p-2 w-full mb-4"
      />

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-md w-full"
        disabled={!formData.username || !formData.password}
      >
        CREATE USER
      </button>
    </form>
  );
};

export default AddUserModal;
