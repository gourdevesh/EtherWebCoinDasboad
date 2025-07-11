import React from 'react'

const PaginationButtons = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 5
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
  let endPage = startPage + maxVisiblePages - 1

  if (endPage > totalPages) {
    endPage = totalPages
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  const pages = []
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return (
    <div className="pagination-container gap-2 mt-3">
      <button
        className="pagination-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`pagination-btn circle-btn ${page === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="pagination-btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  )
}

export default PaginationButtons
