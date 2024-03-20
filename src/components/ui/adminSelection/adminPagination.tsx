import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handlePagination: (direction: string | number) => void;
}

const AdminPagination = ({
  totalPages,
  currentPage,
  handlePagination,
}: PaginationProps) => {
  return (
    <div className="ad-button-container">
      <div
        // disabled={currentGroup === 0}
        style={{ cursor: 'pointer' }}
        onClick={() => handlePagination('prev')}
      >
        <svg
          width="8"
          height="15"
          viewBox="0 0 6 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 9L1 5L5 1"
            stroke="#1D1D1F"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {[...Array(totalPages)].map((_, index) => (
        <div
          className={`notice-button ${currentPage === index ? 'active-item' : ''}`}
          key={index}
          style={{ cursor: 'pointer' }}
          onClick={() => handlePagination(index)}
        >
          {index + 1}
        </div>
      ))}
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => handlePagination('next')}
        // disabled={currentGroup === totalGroup - 1}
      >
        <svg
          width="8"
          height="15"
          viewBox="0 0 6 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 9L5 5L1 1"
            stroke="#1D1D1F"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default AdminPagination;
