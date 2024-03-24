import React, { useState, useEffect } from 'react';
import './myComponent.scss';
import AdminPagination from '../adminSelection/adminPagination';
import { BASE_URL, ACCESS_TOKEN } from '../../global/constants';
import { showErrorToast } from '../toast/toast';

interface Questions {
  questionId: number;
  companyName: string;
  questionerNickname: string;
  questionerTag: string;
  questionTitle: string;
  questionTag: string;
  questionCategory: string;
  questionViewCount: number;
  answerCount: number;
  reward: number;
  createAt: string;
}

interface Data {
  totalPages: number;
  questions: Questions[];
}

interface ApiResponse {
  statusCode: string;
  data: Data;
}
interface MyQuestionProps {
  setQuestionCnt: (cnt: number) => void;
}
export default function MyQuestion({ setQuestionCnt }: MyQuestionProps) {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    loadUserQuestion(currentPage);
    console.log('question:', question);
  }, [currentPage]);

  const [totalPages, setTotalPages] = useState(0);
  const [question, setQuestion] = useState<Questions[]>([]);

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
    fetch(
      `${BASE_URL}/api/question/admin?pageNo=${pageNo}&criterion=createdAt`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      },
    )
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        console.log('사용자 질문:', data);
        setQuestion(data.data.questions);
        setTotalPages(data.data.totalPages);
        setQuestionCnt(data.data.questions.length);
      })
      .catch(() => showErrorToast('질문 불러오기 실패:'));
  };

  return (
    <div className="my-component-width">
      {question?.map((q) => (
        <div className="question-item" key={q.questionId}>
          <div className="question-text">
            <div className="question-item-title">{q.companyName}</div>
            <div className="question-item-content">{q.questionTitle}</div>
          </div>
          <div className="quetion-tag">{q.companyName}</div>
        </div>
      ))}

      {question.length > 1 && (
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePagination={handlePagination}
        />
      )}
    </div>
  );
}
