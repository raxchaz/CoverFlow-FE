import React, { useEffect, useState } from 'react';
import './answerSelection.scss';
import AdminSearch from '../../../asset/image/admin-search.svg';
import Button from '../button/Button/Button';
import { ACCESS_TOKEN, BASE_URL } from '../../global/constants';
import Calendar from '../calendar/calendar';
import AdminPagination from './adminPagination';
import Portal from '../modal/portal';
import AnswerModals from '../modal/AnswerModal';
interface AdminAnswer {
  answerId: number;
  questionId: number;
  answerContent: string;
  selection: string;
  answererNickname: string;
  memberType: string;
  answererTag: string;
  answerStatus: string;
}

interface ApiResponse {
  statusCode: string;
  data: {
    totalPages: number;
    answers: AdminAnswer[];
    totalElements: number;
  };
}

export default function AnswerSelection() {
  const [startDate,setStartDate]= useState(new Date())
  const [endDate, setEndDate] = useState(new Date());
  // const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState<AdminAnswer[]>([]);
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
    const url = `${BASE_URL}/api/answer/admin?${queryParams.toString()}`;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        console.log(data);
        setAnswers(data.data.answers);
        setTotalPages(data.data.totalPages);
      })
      .catch((error) => {
        console.error('Error:', error);
        // setIsLoading(false);
      });
  };

  // console.log(fetchMember(0));
  return (
    <div className="ad-answerSelection-container">
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
        <div className="ad-answerOption">
          <div className="ad-answeritem-direction">
            <div className="ad-answerOption-maxitem">
              <span className="ad-answer-title">가입일</span>
              <input type="checkbox" className="ad-answer-checkbox" />
              <span className="ad-answer-total">전체</span>
            </div>
            <div className="ad-answerSelection-Calendar">
            <Calendar 
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              />
            </div>
          </div>

          <div className="ad-answerOption-item">
            <span className="ad-answer-title">답변상태</span>
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
          <div className="ad-answer-result">
            <ul>
              <li className="ad-answerResult-header">
                <input type="checkbox" />
                {/* <span>번호</span> */}
                <span>질문번호</span>
                <span>답변번호</span>
                <span>작성자</span>
                <span>채택여부</span>
                <span>상태관리</span>
              </li>
              {answers.map((answers, index) => {
                const itemNumber = index + 1 + currentPage * itemsPerPage;
                console.log(itemNumber);
                if (Boolean(answers.answerStatus) === true) {
                  answers.answerStatus = '채택';
                } else {
                  answers.answerStatus = '미채택';
                }
                return (
                  <li key={answers.answerId} className="ad-answerResult-item">
                    <input type="checkbox" />
                    {/* <span>{itemNumber}</span> */}
                    <span>{answers.questionId}</span>
                    <span>{answers.answerId}</span>
                    <span>{answers.answererNickname}</span>
                    <span>{answers.answerStatus}</span>
                    <span>{answers.selection}</span>
                    <span onClick={open}>
                      <span className="ad-memberdetail">관리 변경</span>
                    </span>
                    {isOpen && (
                      <Portal>
                        <AnswerModals close={close} />
                      </Portal>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="ad-answer-pagination">
            {answers && (
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
