// CreateAccountForm.js
import React, { useState } from 'react';
import './CreateAccountForm.css'; // Import CSS styles

const CreateAccountForm = ({ onCreate, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Chỉ giữ lại state password

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onCreate({ username, password }); // Truyền về chỉ có username và password
    } else {
      alert('Please fill in all fields!');
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2>Add User App ACTION_OBS</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-buttons">
            <button className="form-btn form-btn-submit" type="submit">
              Create Account
            </button>
            <button
              className="form-btn form-btn-cancel"
              type="button"
              onClick={() => onCancel(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountForm;
