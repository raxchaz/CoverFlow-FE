import React, { useState, useEffect } from 'react';
import './myComponent.scss';
import AdminPagination from '../adminSelection/adminPagination';
import { BASE_URL, ACCESS_TOKEN } from '../../global/constants';
import { showErrorToast } from '../toast/toast';

interface Answer {
  answerId: number;
  companyName: string;
  questionTitle: string;
  answerContent: string;
  selection: boolean;
  answererNickname: string;
  answererTag: string;
  createAt: Date | string;
}
interface Data {
  totalPages: number;
  answers: Answer[];
}

interface ApiResponse {
  statusCode: string;
  data: Data;
}
interface MyAnswerProps {
  setAnswerCnt: (cnt: number) => void;
}
export default function MyAnswer({ setAnswerCnt }: MyAnswerProps) {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    loadUserQuestion(currentPage);
    console.log('answer:', answer);
  }, [currentPage]);

  const [totalPages, setTotalPages] = useState(0);
  const [answer, setAnswer] = useState<Answer[]>([]);

  const handlePagination = (direction) => {
    if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (typeof direction === 'number') {
      setCurrentPage(direction);
    }
  };

  const loadUserQuestion = (pageNo: number) => {
    fetch(`${BASE_URL}/api/answer/admin?pageNo=${pageNo}&criterion=createdAt`, {
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
        setAnswerCnt(data.data.answers.length);
      })
      .catch(() => showErrorToast('답변 불러오기 실패:'));
  };

  return (
    <div className="my-component-width">
      {answer?.map((q) => (
        <div className="answer-item" key={q.answerId}>
          <div className="answer-item-title">{q.answerContent}</div>
          <div className="answer-item-content">{q.answererNickname}</div>
        </div>
      ))}

      {answer.length > 1 && (
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePagination={handlePagination}
        />
      )}
    </div>
  );
}
