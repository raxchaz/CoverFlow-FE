import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './contactList.scss';

export default function ContactList(props) {
  const [activeToggleIndex, setActiveToggleIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleFunction = (index) => {
    setActiveToggleIndex(activeToggleIndex === index ? null : index);
  };
  // 하승님이 작성하신 페이지네이션 참고하여 작성했습니다.

  const itemsPerPage = 10;
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const getPaginatedList = (list, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return list.slice(startIndex, endIndex);
  };

  const paginatedList = getPaginatedList(props.contactList, currentPage);
  const totalPages = Math.ceil(props.contactList.length / itemsPerPage);

  return (
    <div>
      {paginatedList.map((item, index) => (
        <div
          className={`inquiry-item ${activeToggleIndex === index ? 'active' : ''}`}
          key={item.inquiryId}
          onClick={() => toggleFunction(index)}
        >
          <div className="inquiry-title">
            <div className="inquiry-header">
              <div className="inquiry-tag-container">
                <div className="inquiry-type-tag">{item.inquiryStatus}</div>
                <div className="inquiry-date-tag">2024-03-05</div>
              </div>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0837 5.25L7.00033 9.33333L2.91699 5.25"
                  stroke="#1D1D1F"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2>{item.inquiryContent}</h2>
          </div>
          {activeToggleIndex === index && <div>{item.inquiryContent}</div>}
        </div>
      ))}
      <div className="button-container">
        {[...Array(totalPages)].map((_, index) => (
          <button key={index} onClick={() => handlePageClick(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

ContactList.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  contactList: PropTypes.arrayOf(
    PropTypes.shape({
      inquiryId: PropTypes.number.isRequired,
      inquiryContent: PropTypes.string.isRequired,
      inquiryStatus: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
