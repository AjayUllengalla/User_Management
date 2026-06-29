import { useState, useEffect, useMemo } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../api/userService';
import { mapApiUser, generateId } from '../utils/helpers';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ firstName: '', lastName: '', email: '', department: '' });
  const [sortField, setSortField] = useState('firstName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getUsers();
      setUsers(res.data.map(mapApiUser));
    } catch (err) {
      setError('Failed to load users. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (formData) => {
    try {
      const newUser = { ...formData };
      await createUser(newUser);
      const withId = { ...newUser, id: generateId(users) };
      setUsers((prev) => [withId, ...prev]);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Failed to add user. Please try again.' };
    }
  };

  const editUser = async (id, formData) => {
    try {
      await updateUser(id, formData);
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...formData } : u)));
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Failed to update user. Please try again.' };
    }
  };

  const removeUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Failed to delete user. Please try again.' };
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({ firstName: '', lastName: '', email: '', department: '' });
    setCurrentPage(1);
  };

  const processedUsers = useMemo(() => {
    let result = [...users];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (u) =>
          u.firstName.toLowerCase().includes(q) ||
          u.lastName.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.department.toLowerCase().includes(q)
      );
    }

    // Filters
    if (filters.firstName.trim()) {
      result = result.filter((u) =>
        u.firstName.toLowerCase().includes(filters.firstName.toLowerCase())
      );
    }
    if (filters.lastName.trim()) {
      result = result.filter((u) =>
        u.lastName.toLowerCase().includes(filters.lastName.toLowerCase())
      );
    }
    if (filters.email.trim()) {
      result = result.filter((u) =>
        u.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    }
    if (filters.department.trim()) {
      result = result.filter((u) => u.department === filters.department);
    }

    // Sort
    result.sort((a, b) => {
      const va = (a[sortField] || '').toString().toLowerCase();
      const vb = (b[sortField] || '').toString().toLowerCase();
      return sortOrder === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    });

    return result;
  }, [users, searchQuery, filters, sortField, sortOrder]);

  const totalPages = Math.ceil(processedUsers.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const visibleUsers = processedUsers.slice(startIndex, startIndex + pageSize);

  const activeFilterCount = Object.values(filters).filter((v) => v.trim()).length;

  return {
    users: visibleUsers,
    totalUsers: processedUsers.length,
    loading,
    error,
    searchQuery,
    setSearchQuery: (q) => { setSearchQuery(q); setCurrentPage(1); },
    filters,
    applyFilters,
    clearFilters,
    activeFilterCount,
    sortField,
    sortOrder,
    handleSort,
    currentPage,
    setCurrentPage,
    totalPages,
    pageSize,
    setPageSize: (size) => { setPageSize(size); setCurrentPage(1); },
    addUser,
    editUser,
    removeUser,
    refetch: fetchUsers,
  };
};
