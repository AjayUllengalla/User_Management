import React from 'react';
import { PAGE_SIZE_OPTIONS } from '../utils/constants';

export default function Pagination({ currentPage, totalPages, totalUsers, pageSize, onPageChange, onPageSizeChange }) {
  if (totalPages === 0) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalUsers);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="pagination">
      <div className="pagination-info">
        Showing <strong>{startItem}–{endItem}</strong> of <strong>{totalUsers}</strong> users
      </div>
      <div className="pagination-controls">
        <div className="page-size-selector">
          <span className="page-size-label">Per page:</span>
          <select className="page-size-select" value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
            {PAGE_SIZE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="page-btns">
          <button className="page-btn" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
            ‹
          </button>
          {getPageNumbers().map((page, i) =>
            page === '...' ? (
              <span key={`ellipsis-${i}`} className="page-ellipsis">…</span>
            ) : (
              <button
                key={page}
                className={`page-btn ${currentPage === page ? 'page-btn-active' : ''}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            )
          )}
          <button className="page-btn" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
