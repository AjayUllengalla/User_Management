import React from 'react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="7" cy="7" r="4.5" stroke="#94a3b8" strokeWidth="1.5"/>
        <path d="M10.5 10.5L13.5 13.5" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <input
        className="search-input"
        type="text"
        placeholder="Search by name, email, or department…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className="search-clear" onClick={() => onChange('')} title="Clear">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 3l8 8M11 3l-8 8" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}
