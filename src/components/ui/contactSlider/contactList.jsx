import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './contactList.scss';
import Plus from '../../../asset/image/plus.svg';
import Warning from '../../../asset/image/warning.svg';

export default function ContactList(props) {
  const [activeToggleIndex, setActiveToggleIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentGroup, setCurrentGroup] = useState(0);

  const toggleFunction = (index) => {
    setActiveToggleIndex(activeToggleIndex === index ? null : index);
  };

  const itemsPerPage = 5;
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const handlePreviousGroup = () => {
    setCurrentGroup(Math.max(0, currentGroup - 1));
  };

  const handleNextGroup = () => {
    setCurrentGroup(Math.min(totalGroups - 1, currentGroup + 1));
  };

  const getPaginatedList = (list, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return list.slice(startIndex, endIndex);
  };

  const paginatedList = getPaginatedList(props.contactList, currentPage);
  const totalPages = Math.ceil(props.contactList.length / itemsPerPage);
  const totalGroups = Math.ceil(totalPages / itemsPerPage);
  const startPage = currentGroup * itemsPerPage + 1;
  const endPage = Math.min(startPage + itemsPerPage - 1, totalPages);

  const renderInquiryStatusTag = (status) => {
    let className = '';
    let text = '';
    switch (status) {
      case 'WAIT':
        className = 'yellow';
        text = '답변 대기';
        break;
      case 'COMPLETE':
        className = 'green';
        text = '답변 완료';
        break;

      default:
        className = '';
        text = '';
    }
    return { className, text };
  };

  return (
    <>
      <div className="inquiry-container">
        {paginatedList.length > 0 ? (
          paginatedList.map((item, index) => {
            const { className, text } = renderInquiryStatusTag(
              item.inquiryStatus,
            );
            return (
              <div
                className={`inquiry-item ${activeToggleIndex === index ? 'active' : ''}`}
                key={item.inquiryId}
                onClick={() => toggleFunction(index)}
              >
                <div className="inquiry-title">
                  <div className="inquiry-tag-container">
                    <div className={`inquiry-type-tag ${className}`}>
                      {text}
                    </div>
                    <div className="inquiry-date-tag">
                      {item.createdAt.slice(0, 11)}
                    </div>
                  </div>
                  {item.inquiryTitle}
                  <div className="inquiry-header">
                    <span className="contact-inquiry-title"></span>

                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d={
                          activeToggleIndex === index
                            ? 'M11.0837 8.75L7.00033 4.66667L2.91699 8.75'
                            : 'M11.0837 5.25L7.00033 9.33333L2.91699 5.25'
                        }
                        stroke="#1D1D1F"
                        strokeWidth="0.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                {activeToggleIndex === index && (
                  <div>
                    <div className="inquiry-content-question">
                      {item.inquiryContent}
                    </div>
                    <div className="inquiry-content-answer">
                      <div className="inquiry-content-answer-tag">
                        코버플로우
                      </div>
                      {item.inquiryAnswer}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="inquiry-regist-section-wrapper">
            <img
              className="inquiry-regist-section-img"
              src={Warning}
              alt="Warning Icon"
            />
            <div className="failed-text">문의 내역이 없습니다</div>
            <div className="failed-text2">
              코버플로우에게 궁금한 내용을 문의해주세요.
            </div>

            <div className="registContainer">
              <img className="plus-icon" src={Plus} alt="Plus Icon" />
              <span
                className="contact-inquiry-registration"
                onClick={() => props.setCurrentSection('contact')}
              >
                문의 작성하기
              </span>
            </div>
          </div>
        )}
      </div>
      {paginatedList.length >= 1 && (
        <div className="inquiry-button-container">
          <div
            onClick={handlePreviousGroup}
            disabled={currentGroup === 0}
            style={{ cursor: 'pointer' }}
          >
            <svg
              width="6"
              height="10"
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
          {[...Array(endPage - startPage + 1)].map((_, index) => (
            <div
              className={`inquiry-index-btn ${currentPage === startPage + index ? 'selected' : ''}`}
              key={index}
              onClick={() => handlePageClick(startPage + index)}
            >
              {startPage + index}
            </div>
          ))}
          <div
            style={{ cursor: 'pointer' }}
            onClick={handleNextGroup}
            disabled={currentGroup === totalGroups - 1}
          >
            <svg
              width="6"
              height="10"
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
      )}
    </>
  );
}

ContactList.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  setCurrentSection: PropTypes.func.isRequired,
  contactList: PropTypes.arrayOf(
    PropTypes.shape({
      inquiryId: PropTypes.number.isRequired,
      inquiryContent: PropTypes.string.isRequired,
      inquiryStatus: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
