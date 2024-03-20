import React, { useState, useEffect } from 'react';
import { ACCESS_TOKEN, BASE_URL } from '../../global/constants';
import AdminPagination from './adminPagination';
import { ReactComponent as AdToggle } from '../../../asset/image/admin-toggle.svg';
interface Feedback {
  feedbackId: number;
  feedbackContent: string;
  createdAt: string;
}

interface ApiResponse {
  statusCode: string;
  data: {
    totalPages: number;
    totalElements: number;
    feedbacks: Feedback[];
  };
}
export default function FeedbackSelection() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [totalFeedbackCount, setTotalFeedbackCount] = useState<number>(0);
  const [selectedFeedback, setSelectedFeedback] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    fetchFeedback(currentPage);
  }, [currentPage]);

  const toggleFeedbackContent = (id: number) => {
    setSelectedFeedback(selectedFeedback === id ? null : id);
  };

  const handlePagination = (direction) => {
    if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (typeof direction === 'number') {
      setCurrentPage(direction);
    }
  };

  const fetchFeedback = (pageNo: number) => {
    fetch(
      `${BASE_URL}/api/feedback/admin?pageNo=${pageNo}&Wcriterion=createdAt`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        console.log(data);
        setFeedback(data.data.feedbacks);
        setTotalPages(data.data.totalPages);
        setTotalFeedbackCount(data.data.totalElements);
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="ad-feedbackSelection-container ">
      <div className="ad-feedbackSelection">
        <p className="ad-cnt">
          <span className="ad-cnt-num">{totalFeedbackCount}</span>건의 기업이
          검색되었습니다.
        </p>

        <div className="ad-feedback-result">
          <ul>
            <li className="ad-searchResult-header">
              <input type="checkbox" />
              <span>번호</span>
              <span>작성자</span>
              <span>내용</span>
              <span>등록일 </span>
            </li>
            {feedback.map((company, index) => (
              <React.Fragment key={company.feedbackId}>
                <li
                  key={company.feedbackId}
                  className="ad-searchResult-item"
                  onClick={() => toggleFeedbackContent(company.feedbackId)}
                >
                  <input type="checkbox" />
                  <span>{index + 1}</span>
                  <span>이름 없음</span>
                  <span>{company.feedbackContent}</span>
                  <span>
                    {company.createdAt}
                    <AdToggle style={{ marginLeft: '1rem' }} />
                  </span>
                </li>
                {selectedFeedback === company.feedbackId && (
                  <li className="ad-feedback-content">
                    내용: {company.feedbackContent}
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
        {feedback && (
          <AdminPagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePagination={handlePagination}
          />
        )}
      </div>
    </div>
  );
}
