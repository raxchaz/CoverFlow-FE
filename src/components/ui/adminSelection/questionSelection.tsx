import React, { useEffect, useState } from 'react';
import './questionSelection.scss';
import AdminSearch from '../../../asset/image/admin-search.svg';
import Button from '../button/Button/Button';
import { ACCESS_TOKEN, BASE_URL } from '../../global/constants';
import Calendar from '../calendar/calendar';
import AdminPagination from './adminPagination';
import QuestionModals from '../modal/questionModal';
import Portal from '../modal/portal';
interface AdminQuesions {
  questionId: number;
  companyName: string;
  nickname: string;
  questionerNickname: string;
  questionerTag: string;
  questionTitle: string;
  questionContent: string;
  questionTag: string;
  questionCategory: string;
  answerCount: number;
  questionViewCount: number;
  reward: number;
  selectionStatus: boolean;
  questionStatus: boolean;
  age: string;
}

interface ApiResponse {
  statusCode: string;
  data: {
    totalPages: number;
    questions: AdminQuesions[];
    totalElements: number;
  };
}

export default function QuestionSelection() {
  // const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<AdminQuesions[]>([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    fetchMember(currentPage);
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

  const fetchMember = (pageNo: number) => {
    // setIsLoading(true);
    const queryParams = new URLSearchParams({
      pageNo: pageNo.toString(),
      criterion: 'createdAt',
    });
    const url = `${BASE_URL}/api/question/admin?${queryParams.toString()}`;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        console.log(data);
        setQuestions(data.data.questions);
        setTotalPages(data.data.totalPages);
      })
      .catch((error) => {
        console.error('Error:', error);
        // setIsLoading(false);
      });
  };

  // console.log(fetchMember(0));
  return (
    <div className="ad-questionSelection-container">
      <div className="ad-search">
        <div className="search-container">
          <div className="search-row">
            <select className="search-divider" name="searchOpt" id="searchOpt">
              <option value=""></option>
              <option value="옵션1">옵션1</option>
              <option value="옵션2">옵션2</option>
            </select>
            <input
              className="search-prompt"
              placeholder="검색어를 입력해주세요"
            />
          </div>
          <img className="search-icon" src={AdminSearch} alt="Search" />
        </div>
      </div>
      <>
        <div className="ad-questionOption">
          <div className="ad-questionitem-direction">
            <div className="ad-questionOption-maxitem">
              <span className="ad-question-title">가입일</span>
              <input type="checkbox" className="ad-question-checkbox" />
              <span className="ad-question-total">전체</span>
            </div>
            <div className="ad-questionSelection-Calendar">
              <Calendar />
            </div>
          </div>

          <div className="ad-questionOption-item">
            <span className="ad-question-title">질문상태</span>
            <select className="ad-searchOption-select">
              <option value=""></option>
            </select>
          </div>
        </div>
        <div className="ad-searchResult">
          <div className="admin-btn-wrapper">
            <Button variant="admin" onClick={() => {}}>
              검색
            </Button>
            <Button variant="admin-white" onClick={() => {}}>
              초기화
            </Button>
          </div>
          {/* {isLoading ? (
            <p>로딩 중...</p>
          ) : (
            <div> */}
          <div className="ad-question-result">
            <ul>
              <li className="ad-questionResult-header">
                <input type="checkbox" />
                <span>번호</span>
                <span>제목</span>
                <span>닉네임</span>
                <span>기업명</span>
                <span>조회수</span>
                <span>답변수</span>
                <span>상태 관리</span>
              </li>
              {questions.map((questions, index) => {
                const itemNumber = index + 1 + currentPage * itemsPerPage;
                return (
                  <li
                    key={questions.questionId}
                    className="ad-questionResult-item"
                  >
                    <input type="checkbox" />
                    <span>{itemNumber}</span>
                    <span>{questions.questionTitle}</span>
                    <span>{questions.questionerNickname}</span>
                    <span>{questions.companyName}</span>
                    <span>{questions.questionViewCount}</span>
                    <span>{questions.answerCount}</span>
                    <span onClick={open}>
                      <span className="ad-memberdetail">관리 변경</span>
                    </span>
                    {isOpen && (
                      <Portal>
                        <QuestionModals close={close} />
                      </Portal>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="ad-question-pagination">
            {questions && (
              <AdminPagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePagination={handlePagination}
              />
            )}
          </div>
        </div>
        {/* )}
        </div> */}
      </>
    </div>
  );
}
