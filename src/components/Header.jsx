import React from 'react';

export default function Header({ onAddUser }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <div className="header-logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="#6366f1"/>
              <circle cx="10" cy="10" r="3" fill="white"/>
              <circle cx="18" cy="10" r="3" fill="white" opacity="0.7"/>
              <circle cx="10" cy="18" r="3" fill="white" opacity="0.7"/>
              <circle cx="18" cy="18" r="3" fill="white" opacity="0.5"/>
            </svg>
          </div>
          <div>
            <h1 className="header-title">UserHub</h1>
            <p className="header-subtitle">Admin Dashboard</p>
          </div>
        </div>
        <button className="btn btn-primary" onClick={onAddUser}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Add User
        </button>
      </div>
    </header>
  );
}
