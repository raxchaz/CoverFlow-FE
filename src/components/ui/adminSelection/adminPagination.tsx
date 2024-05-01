import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handlePagination: (direction: string | number) => void;
  className?: string;
}

const AdminPagination = ({
  totalPages,
  currentPage,
  handlePagination,
  className,
}: PaginationProps) => {
  console.log(totalPages, currentPage);
  const maxPagesToShow = 5; // 한 번에 보여줄 최대 페이지 수
  const halfWindow = Math.floor(maxPagesToShow / 2);

  let startPage = Math.max(0, currentPage - halfWindow);
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages - 1);

  // 시작 페이지가 최대한 범위 내에서 조정되도록
  if (endPage - startPage + 1 < maxPagesToShow && startPage > 0) {
    startPage = Math.max(0, endPage - maxPagesToShow + 1);
  }
  const pages: React.ReactNode[] = [];
  for (let page = startPage; page <= endPage; page++) {
    pages.push(
      <div
        className={`notice-button ${currentPage === page ? 'active-item' : ''}`}
        key={page}
        style={{ cursor: 'pointer' }}
        onClick={() => handlePagination(page)}
      >
        {page + 1}
      </div>,
    );
  }
  return (
    <div className={`ad-button-container ${className}`}>
      <div
        style={{ cursor: 'pointer', padding: '1rem' }}
        onClick={() => currentPage > 0 && handlePagination('prev')}
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
      {pages}
      <div
        style={{ cursor: 'pointer', padding: '1rem' }}
        onClick={() => currentPage < totalPages - 1 && handlePagination('next')}
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
