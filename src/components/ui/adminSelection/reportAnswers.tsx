import React, { useEffect, useState } from 'react';
import './reportStyling.scss';
import AdminSearch from '../../../asset/image/admin-search.svg';
import Button from '../button/Button/Button';
import { ACCESS_TOKEN, BASE_URL } from '../../global/constants';
import Calendar from '../calendar/calendar';
import AdminPagination from './adminPagination';
import ReAnswerModals from '../modal/ReanswerModal';
import Portal from '../modal/portal';
import { RSTATUS } from '../../global/constants/adminOption';
interface Reports {
  reportId: number;
  reportContent: string;
  reportType: string;
  reportStatus: boolean;
  reporterNickname?: string;
  reportedNickname?: string;
  questionId?: string;
  createdAt?: number;
}

interface ApiResponse {
  statusCode: string;
  data: {
    totalPages: number;
    reports: Reports[];
    totalElements: number;
  };
}

export default function ReportAnswers() {
  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReportss] = useState<Reports[]>([]);

  const [totalCount, seTtotalCount] = useState(0);
  const [selectedRQ, setSelectedRQ] = useState(null);
  const [rstatus, setRstatus] = useState('');

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
    fetchQuestions(currentPage);
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

  const fetchQuestions = (pageNo: number) => {
    setIsLoading(true);
    const queryParams = new URLSearchParams({
      pageNo: pageNo.toString(),
      criterion: 'createdAt',
    });

    if (rstatus) {
      queryParams.set('reportStatus', rstatus);
    }

    const urls = `${BASE_URL}/api/report/admin?${queryParams.toString()}`;
    fetch(urls, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        console.log(data);
        setReportss(data.data.reports);
        setTotalPages(data.data.totalPages);
        seTtotalCount(data.data.totalElements);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  };

  const handleSearch = () => {
    setCurrentPage(0);
    fetchQuestions(0);
  };

  const showModals = (report) => {
    setSelectedRQ(report);
  };

  const showList = () => {
    setSelectedRQ(null);
  };

  return (
    <div className="ad-reportSelection-container">
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
      {selectedRQ ? (
        <>
          <ReAnswerModals
            close={close}
            reports={selectedRQ}
            showList={showList}
            handleSearch={handleSearch}
          />
        </>
      ) : (
        <>
          <div className="ad-reportOption">
            <div className="ad-reportitem-direction">
              <div className="ad-reportOption-maxitem">
                <span className="ad-report-title">신고일</span>
                <input type="checkbox" className="ad-member-checkbox" />
                <span className="ad-report-total">전체</span>
              </div>
              <div className="ad-reportSelection-Calendar">
                <Calendar />
              </div>
            </div>

            <div className="ad-reportOption-item">
              <span className="ad-report-title">신고사유</span>
              <select className="ad-searchOption-select">
                <option value=""></option>
              </select>
            </div>
            <div className="ad-reportOption-item">
              <span className="ad-report-title">신고상태</span>
              <select
                className="ad-searchOption-select"
                value={rstatus}
                onChange={(e) => setRstatus(e.target.value)}
              >
                <option value=""></option>
                {RSTATUS.map((RSTATUS) => (
                  <option key={RSTATUS.key} value={RSTATUS.key}>
                    {RSTATUS.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="ad-searchResult">
            <div className="admin-btn-wrapper">
              <Button
                variant="admin"
                onClick={() => {
                  handleSearch();
                }}
              >
                검색
              </Button>
              <Button variant="admin-white" onClick={() => {}}>
                초기화
              </Button>
            </div>
            {isLoading ? (
              <p>로딩 중...</p>
            ) : (
              <div>
                <p className="ad-cnt">
                  <span className="ad-cnt-num">{totalCount}</span>건의 기업이
                  검색되었습니다.
                </p>

                <div className="ad-report-result">
                  <ul>
                    <li className="ad-reportResult-header">
                      <input type="checkbox" />
                      <span>질문번호</span>
                      <span>답변번호</span>
                      <span>작성자</span>
                      <span>신고자</span>
                      <span>신고일</span>
                      <span>상태관리</span>
                    </li>
                    {reports.map((reports, index) => {
                      const itemNumber = index + 1 + currentPage * itemsPerPage;
                      console.log(itemNumber);
                      return (
                        <li
                          key={reports.reportId}
                          className="ad-reportResult-item"
                        >
                          <input type="checkbox" />
                          <span>{itemNumber}</span>
                          <span>{reports.reportId}</span>
                          <span>{reports.reportedNickname}</span>
                          <span>{reports.reporterNickname}</span>
                          <span>{reports.createdAt}</span>
                          <span
                            onClick={open}
                            onSubmit={() => showModals(reports)}
                          >
                            <span className="ad-memberdetail">관리 변경</span>
                          </span>
                          {isOpen && (
                            <Portal>
                              <ReAnswerModals
                                close={close}
                                reports={reports}
                                key={reports.reportId}
                                showList={showList}
                                handleSearch={handleSearch}
                              />
                            </Portal>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="ad-report-pagination">
                  {reports && (
                    <AdminPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      handlePagination={handlePagination}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
