import React, { useEffect, useState } from 'react';
import './questionSelection.scss';
import AdminSearch from '../../../asset/image/admin-search.svg';
import Button from '../button/Button/Button';
import { fetchAPI } from '../../global/utils/apiUtil';
import Calendar from '../calendar/calendar';
import AdminPagination from './adminPagination';
import QuestionModals from '../modal/questionModal';
import Portal from '../modal/portal';

interface AdminQuestions {
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
  createAt:string;
}

interface ApiResponse {
  statusCode: string;
  data: {
    totalPages: number;
    questions: AdminQuestions[];
    totalElements: number;
  };
}

export default function QuestionSelection() {
  // Calendar 관련 주석 추가합니다.
  // 1.시작일자, 끝나는 일자는 상위 컴포넌트에서 props로 전달합니다.
  // fetch 뿐 아니라 초기화나 전체 선택 등.... 좀 더 용이하게 사용할 수 있도록 코드 수정했습니다.
  // Calendar 사용중인 전체 코드에 추가 해두었으며, console로 확인 가능
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [questions, setQuestions] = useState<AdminQuestions[]>([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDateFilterChecked, setIsDateFilterChecked] = useState<boolean>(false);

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

  // 전체 선택 버튼 옵션
  const handleDateFilterChange = () => {
    const newValue = !isDateFilterChecked;
    setIsDateFilterChecked(newValue);
    if (!newValue) {
      setStartDate(new Date());
      setEndDate(new Date());
    }
  };

  // 초기화 버튼 옵션
  const initiateQuestion=()=>{
    setStartDate(new Date());
    setEndDate(new Date());
    setQuestions([])
    setTotalPages(0)
    setIsDateFilterChecked(false)
  }


    // 2. 인자 : date로 기존에 설정되어있었기에, 아래처럼 작성하면 형식에 맞게 요청 가능합니다. 
    // 처음에 안내 드린 것 같이, 로그인 유지를 위해 fetchAPI 함수를 임포트하여 사용해주세요. 
    // 기존 처럼 단순 fetch 사용하시려면, 리프레쉬 토큰 재발급 로직을 추가해주셔야 합니다.
    const fetchMember = async (pageNo: number) => {
      try {
        const queryParams = new URLSearchParams({
          pageNo: pageNo.toString(),
          criterion: 'createdAt',
          ...(isDateFilterChecked ? {} : {
            createdStartDate: startDate.toISOString().split('T')[0],
            createdEndDate: endDate.toISOString().split('T')[0],
          }),
        });
  
        const endpoint = `/api/question/admin?${queryParams.toString()}`;
        const data: ApiResponse = await fetchAPI(endpoint, 'GET');
  
        setQuestions(data.data.questions);
        setTotalPages(data.data.totalPages);
      } catch (error) {
        console.error('Error:', error);
      }
    };

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
              <input
                type="checkbox"
                className="ad-question-checkbox"
                checked={isDateFilterChecked}
                onChange={handleDateFilterChange}
              />
              <span className="ad-question-total">전체</span>
            </div>
            {!isDateFilterChecked && (
              <div className="ad-questionSelection-Calendar">
                <Calendar
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                />
              </div>
            )}
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
            <Button variant="admin" onClick={() => {fetchMember(currentPage)}}>
              검색
            </Button>
            <Button variant="admin-white" onClick={() => {initiateQuestion()}}>
              초기화
            </Button>
          </div>
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
                <span>작성일</span>
                <span>상태 관리</span>
              </li>
              {questions.map((question, index) => {
                const itemNumber = index + 1 + currentPage * itemsPerPage;
                return (
                  <li key={question.questionId} className="ad-questionResult-item">
                    <input type="checkbox" />
                    <span>{itemNumber}</span>
                    <span>{question.questionTitle}</span>
                    <span>{question.questionerNickname}</span>
                    <span>{question.companyName}</span>
                    <span>{question.questionViewCount}</span>
                    <span>{question.answerCount}</span>
                    <span>{question.createAt}</span>
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
          {questions.length>0 && (
          <div className="ad-question-pagination">
           
              <AdminPagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePagination={handlePagination}
              />
            
          </div>
          )}
        </div>
      </>
    </div>
  );
}
