import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './contactList.scss';
import Plus from '../../../asset/image/plus.svg';
import Warning from '../../../asset/image/warning.svg';
import { ReactComponent as LeftArrow } from '../../../asset/image/left_arrow.svg';
import { ReactComponent as RightArrow } from '../../../asset/image/right_arrow.svg';
import store from '../../../store';

export default function ContactList({
  contactList,
  setCurrentSection,
  setCurrentPageAPI,
  totalPages,
}) {
  const reduxData = store.getState().auth;
  const [activeToggleIndex, setActiveToggleIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const groupSize = 5; // 한 그룹당 최대 페이지 수
  const [currentGroup, setCurrentGroup] = useState(0); // 현재 페이지 그룹 인덱스

  // 페이지 그룹별 시작 및 끝 페이지 계산
  const totalGroups = Math.ceil(totalPages / groupSize);
  console.log('리덕스 확인', reduxData);
  const startPage = currentGroup * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);

  const toggleFunction = (index) => {
    setActiveToggleIndex(activeToggleIndex === index ? null : index);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    setCurrentPageAPI(page - 1);
  };

  const handlePreviousGroup = () => {
    if (currentGroup > 0) {
      setCurrentGroup(currentGroup - 1);
    }
  };

  const handleNextGroup = () => {
    if (currentGroup < totalGroups - 1) {
      setCurrentGroup(currentGroup + 1);
    }
  };

  // 현재 페이지 그룹에 따라 페이지네이션 렌더링
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <div
          className={`inquiry-index-btn ${currentPage === i ? 'selected' : ''}`}
          key={i}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </div>,
      );
    }
    // 페이지 번호가 없는 경우 (totalPages가 1인 경우 포함) 여기서 처리할 수 있습니다.
    if (pages.length === 0) {
      pages.push(
        <div
          className="inquiry-index-btn selected"
          key={1}
          onClick={() => handlePageClick(1)}
        >
          1
        </div>,
      );
    }
    // console.log(`totalPages: ${totalPages}`);
    // console.log(`startPage: ${startPage}, endPage: ${endPage}`);
    return pages;
  };

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
        {contactList.length > 0 ? (
          contactList.map((item, index) => {
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
                onClick={() => setCurrentSection('contact')}
              >
                문의 작성하기
              </span>
            </div>
          </div>
        )}
      </div>
      {contactList.length > 1 && (
        <div className="inquiry-button-container">
          <LeftArrow onClick={handlePreviousGroup} />
          {renderPageNumbers()}
          <RightArrow onClick={handleNextGroup} />
        </div>
      )}
    </>
  );
}

ContactList.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  setCurrentSection: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  setCurrentPageAPI: PropTypes.func.isRequired,
  contactList: PropTypes.arrayOf(
    PropTypes.shape({
      inquiryId: PropTypes.number.isRequired,
      inquiryContent: PropTypes.string.isRequired,
      inquiryTitle: PropTypes.string.isRequired,
      inquiryStatus: PropTypes.string.isRequired,
      createdAt: PropTypes.string,
    }),
  ).isRequired,
};
