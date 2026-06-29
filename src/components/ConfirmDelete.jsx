import React, { useState } from 'react';

export default function ConfirmDelete({ user, onClose, onConfirm }) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirm = async () => {
    setDeleting(true);
    setError(null);
    const result = await onConfirm(user.id);
    setDeleting(false);
    if (result.success) {
      onClose();
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-sm">
        <div className="modal-header">
          <h2 className="modal-title">Delete User</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="modal-body">
          {error && <div className="alert alert-error">{error}</div>}
          <div className="delete-icon-wrapper">
            <div className="delete-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M4 7h20M10 7V5h8v2M5 7l1.5 17h15L23 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 12l.5 7M17 12l-.5 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <p className="delete-message">
            Are you sure you want to delete <strong>{user.firstName} {user.lastName}</strong>?
          </p>
          <p className="delete-submessage">This action cannot be undone.</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose} disabled={deleting}>Cancel</button>
          <button className="btn btn-danger" onClick={handleConfirm} disabled={deleting}>
            {deleting ? 'Deleting…' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
