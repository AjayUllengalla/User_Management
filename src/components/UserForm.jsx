import React, { useState, useEffect } from 'react';
import { validateForm, hasErrors } from '../utils/validators';
import { DEPARTMENTS } from '../utils/constants';

const EMPTY_FORM = { firstName: '', lastName: '', email: '', department: '' };

export default function UserForm({ user, onClose, onSubmit }) {
  const isEdit = Boolean(user);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    if (user) {
      setForm({ firstName: user.firstName, lastName: user.lastName, email: user.email, department: user.department });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
    setApiError(null);
  }, [user]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm(form);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    setApiError(null);
    const result = await onSubmit(form);
    setSubmitting(false);
    if (result.success) {
      onClose();
    } else {
      setApiError(result.error);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">{isEdit ? 'Edit User' : 'Add New User'}</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="modal-body">
          {apiError && <div className="alert alert-error">{apiError}</div>}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">First Name <span className="required">*</span></label>
              <input
                className={`form-input ${errors.firstName ? 'form-input-error' : ''}`}
                placeholder="Enter first name"
                value={form.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
              />
              {errors.firstName && <span className="form-error">{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Last Name <span className="required">*</span></label>
              <input
                className={`form-input ${errors.lastName ? 'form-input-error' : ''}`}
                placeholder="Enter last name"
                value={form.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
              />
              {errors.lastName && <span className="form-error">{errors.lastName}</span>}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email Address <span className="required">*</span></label>
            <input
              className={`form-input ${errors.email ? 'form-input-error' : ''}`}
              type="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label className="form-label">Department <span className="required">*</span></label>
            <select
              className={`form-input ${errors.department ? 'form-input-error' : ''}`}
              value={form.department}
              onChange={(e) => handleChange('department', e.target.value)}
            >
              <option value="">Select a department</option>
              {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            {errors.department && <span className="form-error">{errors.department}</span>}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose} disabled={submitting}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting}>
            {submitting ? (isEdit ? 'Saving…' : 'Adding…') : (isEdit ? 'Save Changes' : 'Add User')}
          </button>
        </div>
      </div>
    </div>
  );
}
