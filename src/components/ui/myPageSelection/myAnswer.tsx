import React, { useState, useEffect } from 'react';
import './myComponent.scss';
import AdminPagination from '../adminSelection/adminPagination';
import { BASE_URL, ACCESS_TOKEN } from '../../global/constants';
import { showErrorToast } from '../toast/toast';
import { useNavigate } from 'react-router-dom';

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
    console.log('answer:', answer);
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

  const loadUserAnswer = (pageNo: number) => {
    fetch(`${BASE_URL}/api/answer/me?pageNo=${pageNo}&criterion=createdAt`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    })
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        console.log('사용자 답변:', data);
        setAnswer(data.data.answers);
        setTotalPages(data.data.totalPages);
        setAnswerCnt(data.data.totalElements);
      })
      .catch(() => showErrorToast('답변 불러오기 실패:'));
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
            <div className="question-item-title">{q.questionTitle}</div>
            <div className="question-item-content">{q.answerContent}</div>
          </div>
          <div className="quetion-tag">{q.companyName}</div>
        </div>
      ))}

      {answer && (
        <AdminPagination
          className="my-question-pagination"
          currentPage={currentPage}
          totalPages={totalPages}
          handlePagination={handlePagination}
        />
      )}
    </div>
  );
}
