import React, { useState, useEffect } from 'react';
import './myComponent.scss';
import AdminPagination from '../adminSelection/adminPagination';
import { showErrorToast } from '../toast/toast';
import { useNavigate } from 'react-router-dom';
import { fetchAPI } from '../../global/utils/apiUtil';

interface Answer {
  answerId: number;
  companyId: number;
  companyName: string;
  questionTitle: string;
  answerContent: string;
  questionId: number;
  selection: boolean;
  answererNickname: string;
  answererTag: string;
  createAt: Date | string;
}
interface Data {
  totalPages: number;
  totalElements: number;
  answers: Answer[];
  statusCode: string;
}

interface ApiResponse {
  statusCode: string;
  data: Data;
}
interface MyAnswerProps {
  setAnswerCnt: (cnt: number) => void;
  initiateAnswer: Answer[];
}
export default function MyAnswer({
  setAnswerCnt,
  initiateAnswer,
}: MyAnswerProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [answer, setAnswer] = useState<Answer[]>(initiateAnswer);
  useEffect(() => {
    loadUserAnswer(currentPage);
    // console.log('answer:', answer);
  }, [currentPage]);

  const handlePagination = (direction) => {
    if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (typeof direction === 'number') {
      setCurrentPage(direction);
    }
  };

  const loadUserAnswer = async (pageNo: number) => {
    try {
      const data: ApiResponse = await fetchAPI(
        `/api/answer/me?pageNo=${pageNo}&criterion=createdAt`,
        'GET',
      );
      // console.log('사용자 답변:', data);
      setAnswer(data.data.answers);
      setTotalPages(data.data.totalPages);
      setAnswerCnt(data.data.totalElements);
    } catch (error) {
      showErrorToast('답변 불러오기 실패:');
    }
  };

  return (
    <div className="my-component-width">
      {answer?.map((q) => (
        <div
          className="question-item"
          key={q.answerId}
          onClick={() =>
            navigate(`/company-info/${q.companyId}/${q.questionId}`)
          }
        >
          <div className="question-text">
            <div className="answer-item-title" style={{ fontSize: '1.5rem' }}>
              {q.questionTitle}
            </div>
            <div className="answer-item-content" style={{ fontSize: '1.8rem' }}>
              {q.answerContent}
            </div>
          </div>
          <div className="quetion-tag">{q.companyName}</div>
        </div>
      ))}

      {initiateAnswer.length >= 1 ? (
        <AdminPagination
          className="rst-pagination"
          currentPage={currentPage}
          totalPages={totalPages}
          handlePagination={handlePagination}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}
