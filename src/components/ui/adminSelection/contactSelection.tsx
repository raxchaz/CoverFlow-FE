import React, { useEffect, useState } from 'react';
import './contactSelection.scss';
import AdminSearch from '../../../asset/image/admin-search.svg';
import Button from '../button/Button/Button';
import { ACCESS_TOKEN, BASE_URL } from '../../global/constants';
import Calendar from '../calendar/calendar';
import AdminPagination from './adminPagination';
import ContactDetail from './contactDetail';
import { CSTATUS } from '../../global/constants/adminOption';
interface Inquiries {
  inquiryId: number;
  inquiryTitle: string;
  inquiryContent: string;
  inquiryAnswer: string;
  inquiryStatus: string;
  inquirerNickname: string;
  createdAt: string;
}

interface ApiResponse {
  statusCode: string;
  data: {
    totalPages: number;
    inquiries: Inquiries[];
    totalElements: number;
  };
}

export default function ContactSelection() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const [totalInqueryCount, seTtotalInqueryCount] = useState(0);
  const [selectedInquery, setSelectedInquery] = useState(null);
  const [inqueryStatus, setInqueryStatus] = useState('');
  const [inquries, setInquiries] = useState<Inquiries[]>([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchInquiries(currentPage);
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

  const fetchInquiries = (pageNo: number) => {
    setIsLoading(true);
    const queryParams = new URLSearchParams({
      pageNo: pageNo.toString(),
      criterion: 'createdAt',
    });

    if (inqueryStatus) {
      queryParams.set('InqueryStatus', inqueryStatus);
    }

    const reporturl = `${BASE_URL}/api/inquiry/admin?${queryParams.toString()}`;
    fetch(reporturl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        console.log(data);
        setInquiries(data.data.inquiries);
        setTotalPages(data.data.totalPages);
        seTtotalInqueryCount(data.data.totalElements);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  };

  const handleSearch = () => {
    setCurrentPage(0);
    fetchInquiries(0);
  };

  const showInqueryDetail = (inquries) => {
    setSelectedInquery(inquries);
  };

  const showInqueryList = () => {
    setSelectedInquery(null);
  };

  return (
    <div className="ad-contactSelection-container">
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
      {selectedInquery ? (
        <>
          <h1 className="ad-contact-title">문의 사항 관리</h1>
          <ContactDetail
            inquiries={selectedInquery}
            showInqueryList={showInqueryList}
            handleSearch={handleSearch}
          />
        </>
      ) : (
        <>
          <div className="ad-contactOption">
            <div className="ad-contactitem-direction">
              <div className="ad-contactOption-maxitem">
                <span className="ad-contact-title">작성일</span>
                <input type="checkbox" className="ad-contact-checkbox" />
                <span className="ad-contact-total">전체</span>
              </div>
              <div className="ad-contactSelection-Calendar">
                <Calendar
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                />
              </div>
            </div>

            <div className="ad-contactOption-item">
              <span className="ad-contact-title">문의상태</span>
              <select
                className="ad-searchOption-select"
                value={inqueryStatus}
                onChange={(e) => setInqueryStatus(e.target.value)}
              >
                <option value=""></option>
                {CSTATUS.map((inquiryStatus) => (
                  <option key={inquiryStatus.key} value={inquiryStatus.key}>
                    {inquiryStatus.value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="ad-searchResult">
            <div className="admin-btn-wrapper">
              <Button variant="admin" onClick={handleSearch}>
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
                <p className="ad-member-cnt">
                  <span className="ad-member-num">{totalInqueryCount}</span>건의
                  기업이 검색되었습니다.
                </p>
                <div className="ad-contact-result">
                  <ul>
                    <li className="ad-contactResult-header">
                      <input type="checkbox" />
                      <span>번호</span>
                      <span>작성자</span>
                      <span>등록일</span>
                      <span>상태관리</span>
                    </li>
                    {inquries.map((inquries, index) => {
                      const itemNumber = index + 1 + currentPage * itemsPerPage;
                      console.log(itemNumber);
                      return (
                        <li
                          key={inquries.inquiryId}
                          className="ad-contactResult-item"
                        >
                          <input type="checkbox" />
                          {/* <span>{itemNumber}</span> */}
                          <span>{inquries.inquiryId}</span>
                          <span>{inquries.inquirerNickname}</span>
                          <span>{inquries.createdAt}</span>
                          <span onClick={() => showInqueryDetail(inquries)}>
                            <span className="ad-contactdetail">관리 변경</span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="ad-contact-pagination">
                  {inquries && (
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
