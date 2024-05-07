import React, { useState, useEffect } from 'react';
import './myComponent.scss';
import AdminPagination from '../adminSelection/adminPagination';
import { showErrorToast } from '../toast/toast';
import { useNavigate } from 'react-router-dom';
import { fetchAPI } from '../../global/utils/apiUtil';
import NoContentsComponent from '../noContentsComponent/noContentsComponent';

interface Questions {
  questionId: number;
  companyId: number;
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
  totalElements: number;
  statusCode: string;
  questions: Questions[];
}

interface ApiResponse {
  statusCode: string;
  data: Data;
}
interface MyQuestionProps {
  setQuestionCnt: (cnt: number) => void;
  initiateQuestion: Questions[];
}
export default function MyQuestion({
  setQuestionCnt,
  initiateQuestion,
}: MyQuestionProps) {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    loadUserQuestion(currentPage);
  }, [currentPage]);
  const navigate = useNavigate();

  const [totalPages, setTotalPages] = useState(0);
  const [question, setQuestion] = useState<Questions[]>(initiateQuestion);

  const handlePagination = (direction) => {
    if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (typeof direction === 'number') {
      setCurrentPage(direction);
    }
  };

  const loadUserQuestion = async (pageNo: number) => {
    try {
      const data: ApiResponse = await fetchAPI(
        `/api/question/me?pageNo=${pageNo}&criterion=createdAt`,
        'GET',
      );
      setQuestion(data.data.questions);
      setTotalPages(data.data.totalPages);
      setQuestionCnt(data.data.totalElements);
    } catch (error) {
      showErrorToast('질문 불러오기 실패:');
    }
  };

  const goToSearch = () => navigate('/search-company');

  return (
    <div className="my-component-width">
      {question.length > 0 ? (
        question.map((q) => (
          <div
            className="answer-item"
            key={q.questionId}
            onClick={() =>
              navigate(`/company-info/${q.companyId}/${q.questionId}`)
            }
          >
            <div className="answer-item-title">{q.companyName}</div>
            <div className="answer-item-content" style={{ width: '48rem' }}>
              {q.questionTitle}
            </div>
          </div>
        ))
      ) : (
        <NoContentsComponent
          onClick={goToSearch}
          content1="내가 남긴 질문이"
          content2="존재하지 않습니다"
          theme="질문"
        />
      )}

      {question.length >= 1 && (
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePagination={handlePagination}
        />
      )}
    </div>
  );
}
