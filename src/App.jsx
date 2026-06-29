import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterPopup from './components/FilterPopup';
import UserTable from './components/UserTable';
import Pagination from './components/Pagination';
import UserForm from './components/UserForm';
import ConfirmDelete from './components/ConfirmDelete';
import { useUsers } from './hooks/useUsers';
import './styles/global.css';

export default function App() {
  const {
    users, totalUsers, loading, error,
    searchQuery, setSearchQuery,
    filters, applyFilters, clearFilters, activeFilterCount,
    sortField, sortOrder, handleSort,
    currentPage, setCurrentPage, totalPages,
    pageSize, setPageSize,
    addUser, editUser, removeUser, refetch,
  } = useUsers();

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  const handleAddUser = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    if (editingUser) {
      return await editUser(editingUser.id, formData);
    } else {
      return await addUser(formData);
    }
  };

  return (
    <div className="app">
      <Header onAddUser={handleAddUser} />

      <main className="main">
        {error && (
          <div className="alert alert-error alert-banner">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 5v3.5M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {error}
            <button className="alert-retry" onClick={refetch}>Retry</button>
          </div>
        )}

        <div className="toolbar">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterPopup
            filters={filters}
            onApply={applyFilters}
            onClear={clearFilters}
            activeFilterCount={activeFilterCount}
          />
        </div>

        <div className="stats-bar">
          <span className="stats-text">
            {loading ? 'Loading users…' : `${totalUsers} user${totalUsers !== 1 ? 's' : ''} found`}
          </span>
          {activeFilterCount > 0 && (
            <button className="clear-filters-link" onClick={clearFilters}>
              Clear {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''}
            </button>
          )}
        </div>

        <UserTable
          users={users}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
          onEdit={handleEditUser}
          onDelete={setDeletingUser}
          loading={loading}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalUsers={totalUsers}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </main>

      {showForm && (
        <UserForm
          user={editingUser}
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      {deletingUser && (
        <ConfirmDelete
          user={deletingUser}
          onClose={() => setDeletingUser(null)}
          onConfirm={removeUser}
        />
      )}
    </div>
  );
}
