// ConfirmDialog.js
import React from 'react';
import './ConfirmDialog.css'; // Import CSS styles

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog-container">
        <p className="confirm-dialog-message">{message}</p>
        <div className="confirm-dialog-buttons">
          <button className="confirm-dialog-btn confirm-dialog-btn-confirm" onClick={() => onConfirm(true)}>
            YES
          </button>
          <button className="confirm-dialog-btn confirm-dialog-btn-cancel" onClick={() => onCancel(false)}>
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
