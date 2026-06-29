import React from 'react';

function SortIcon({ field, sortField, sortOrder }) {
  const active = field === sortField;
  return (
    <span className={`sort-icon ${active ? 'sort-active' : ''}`}>
      {active ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
    </span>
  );
}

function DeptBadge({ dept }) {
  const colors = {
    Engineering: '#6366f1', Marketing: '#f59e0b', Sales: '#10b981',
    HR: '#ec4899', Finance: '#3b82f6', IT: '#8b5cf6', Design: '#f97316', Operations: '#14b8a6',
  };
  const color = colors[dept] || '#94a3b8';
  return (
    <span className="dept-badge" style={{ '--badge-color': color }}>
      {dept}
    </span>
  );
}

export default function UserTable({ users, sortField, sortOrder, onSort, onEdit, onDelete, loading }) {
  if (loading) {
    return (
      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th><th>First Name</th><th>Last Name</th>
              <th>Email</th><th>Department</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 8 }).map((_, i) => (
              <tr key={i} className="skeleton-row">
                {Array.from({ length: 6 }).map((_, j) => (
                  <td key={j}><div className="skeleton" style={{ width: j === 3 ? '80%' : j === 5 ? '100px' : '60%' }} /></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="empty-state">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" fill="#f1f5f9"/>
          <path d="M16 28s2-4 8-4 8 4 8 4" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="19" cy="20" r="2" fill="#94a3b8"/>
          <circle cx="29" cy="20" r="2" fill="#94a3b8"/>
        </svg>
        <p className="empty-title">No users found</p>
        <p className="empty-subtitle">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            {['firstName', 'lastName', 'email', 'department'].map((f) => (
              <th key={f} className="sortable-th" onClick={() => onSort(f)}>
                {{ firstName: 'First Name', lastName: 'Last Name', email: 'Email', department: 'Department' }[f]}
                <SortIcon field={f} sortField={sortField} sortOrder={sortOrder} />
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="user-row">
              <td><span className="user-id">#{user.id}</span></td>
              <td className="fw-medium">{user.firstName}</td>
              <td>{user.lastName}</td>
              <td className="email-cell">{user.email}</td>
              <td><DeptBadge dept={user.department} /></td>
              <td>
                <div className="action-btns">
                  <button className="action-btn action-edit" onClick={() => onEdit(user)} title="Edit">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M9.5 2.5l2 2-7 7H2.5v-2l7-7z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                    </svg>
                    Edit
                  </button>
                  <button className="action-btn action-delete" onClick={() => onDelete(user)} title="Delete">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 3.5h10M5.5 3.5V2.5h3v1M4.5 3.5l.5 8h4l.5-8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
