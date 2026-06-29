import React, { useState, useEffect, useRef } from 'react';
import { DEPARTMENTS } from '../utils/constants';

export default function FilterPopup({ filters, onApply, onClear, activeFilterCount }) {
  const [open, setOpen] = useState(false);
  const [local, setLocal] = useState(filters);
  const ref = useRef(null);

  useEffect(() => { setLocal(filters); }, [filters]);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleApply = () => {
    onApply(local);
    setOpen(false);
  };

  const handleClear = () => {
    const empty = { firstName: '', lastName: '', email: '', department: '' };
    setLocal(empty);
    onClear();
    setOpen(false);
  };

  return (
    <div className="filter-popup-wrapper" ref={ref}>
      <button className={`btn btn-secondary ${activeFilterCount > 0 ? 'btn-active' : ''}`} onClick={() => setOpen(!open)}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path d="M1 3h13M3 7.5h9M5.5 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        Filters
        {activeFilterCount > 0 && <span className="filter-badge">{activeFilterCount}</span>}
      </button>

      {open && (
        <div className="filter-popup">
          <div className="filter-popup-header">
            <span className="filter-popup-title">Filter Users</span>
            {activeFilterCount > 0 && (
              <button className="filter-clear-link" onClick={handleClear}>Clear all</button>
            )}
          </div>
          <div className="filter-grid">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input className="form-input" placeholder="e.g. John" value={local.firstName}
                onChange={(e) => setLocal({ ...local, firstName: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input className="form-input" placeholder="e.g. Doe" value={local.lastName}
                onChange={(e) => setLocal({ ...local, lastName: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" placeholder="e.g. john@..." value={local.email}
                onChange={(e) => setLocal({ ...local, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Department</label>
              <select className="form-input" value={local.department}
                onChange={(e) => setLocal({ ...local, department: e.target.value })}>
                <option value="">All Departments</option>
                {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className="filter-popup-footer">
            <button className="btn btn-ghost btn-sm" onClick={() => setOpen(false)}>Cancel</button>
            <button className="btn btn-primary btn-sm" onClick={handleApply}>Apply Filters</button>
          </div>
        </div>
      )}
    </div>
  );
}
