// ResetAccountForm.js
import React, { useState } from 'react';
import './ResetAccountForm.css'; // Import CSS styles

const ResetAccountForm = ({ userId, onResetPassword, onResetAuthKey, onCancel }) => {

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (userId) {
      onResetPassword(userId); 
    } else {
      alert('No user ID provided!');
    }
  };

  const handleResetAuthKey = (e) => {
    e.preventDefault();
    if (userId) {
      onResetAuthKey(userId); 
    }else {
      alert('No user ID provided!');
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2>Account Settings</h2>
        <form>
        
          <div className="form-buttons">
            <button
              className="form-btn form-btn-reset-password"
              type="button"
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
            <button
              className="form-btn form-btn-reset-auth-key"
              type="button"
              onClick={handleResetAuthKey}
            >
              Reset Authen Key
            </button>
          </div>
          <button
            className="form-btn form-btn-cancel"
            type="button"
            onClick={() => onCancel(false)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetAccountForm;
