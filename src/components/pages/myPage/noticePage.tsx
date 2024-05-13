import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../asset/sass/pages/myPage/noticePage.scss';
import WarningIcon from "../../../asset/image/faceicon.svg"
import { StyledHeader, StyledPage } from '../../../styledComponent';
import TitleHeader from '../../ui/header/titleHeader';
import TabBar from '../../ui/tabBar/tabBar';
import upArrow from '../../../asset/image/notice-up-arrow.svg';
import downArrow from '../../../asset/image/notice-down-arrow.svg';
import AdminPagination from '../../ui/adminSelection/adminPagination';
import styled from 'styled-components';
// import { BASE_URL } from '../../global/constants';
import { fetchAPI } from '../../global/utils/apiUtil';

interface Notice {
  noticeId: number;
  noticeTitle: string;
  noticeContent: string;
  noticeViews: number;
  noticeStatus: boolean;
  createdAt: string;
}

// interface NoticeData {
//   totalPages: number;
//   totalElements: number;
//   notices: Notice[];
// }

// interface ApiResponse {
//   statusCode: string;
//   data: NoticeData;
// }

const PaginationWrapper = styled.div`
  position: fixed;
  bottom: 5rem;
  width: 69rem;
  background-color: #fff;
  padding: 10px 20px;
  @media (max-width: 768px) {
    padding: 5px 10px;
  }

  @media (max-width: 480px) {
    padding: 5px;
  }
`;

function NoticePage() {
  const [activePanelIndex, setActivePanelIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [notices, setNotices] = useState<Notice[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const notices = await fetchAPI(
          `/api/notice?pageNo=${currentPage}&criterion=createdAt`,
          'GET',
        );
        // console.log('Notices:', notices);
        setTotalPages(notices.data.totalPages);
        setNotices(notices.data.notices);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotices();
  }, [currentPage]);
  const handlePanelToggle = (index) => {
    setActivePanelIndex(activePanelIndex === index ? null : index);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handlePagination = (direction) => {
    if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (typeof direction === 'number') {
      setCurrentPage(direction);
    }
  };

  // const totalNotice = noticeList.length;

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="공지사항" handleGoBack={handleGoBack} />
        <div className="notice-wrapper">
          {notices.length > 0 ? (
            notices.map((notice, index) => (
              <div
                className={`notice-list ${activePanelIndex === index ? 'active' : ''}`}
                key={index}
                onClick={() => handlePanelToggle(index)}
              >
                <div className="notice-item-container">
                  <div className="notice-item">
                    <h3>{notice.createdAt}</h3>
                    <h2>{notice.noticeTitle}</h2>
                  </div>
                  <img
                    src={activePanelIndex === index ? upArrow : downArrow}
                    alt="toggle_icon"
                    className="activePanel-toggle"
                  />
                </div>
                <div className="panel">
                  <span>{notice.noticeContent}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-notice-wrapper">
              <img src={WarningIcon} alt="no-notice"/> 
              <h2>등록된 공지사항이 없습니다.</h2>
            </div>
          )}
        </div>
        {notices.length > 0 && (
          <PaginationWrapper>
            <AdminPagination
              className="notice-pagination"
              totalPages={totalPages}
              currentPage={currentPage}
              handlePagination={handlePagination}
            />
          </PaginationWrapper>
        )}
      </StyledHeader>
      <TabBar />
    </StyledPage>
  );
}

export default NoticePage;
