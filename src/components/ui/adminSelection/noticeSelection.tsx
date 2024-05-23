import React, { useState, useEffect } from 'react';
import { fetchAPI } from '../../global/utils/apiUtil';
import { showSuccessToast } from '../toast/toast';
import AdminPagination from './adminPagination';
import NoticeDetail from './noticeDetail';
import NoticeCreate from './noticeCreate';
import "./noticeSelection.scss";

interface Notice {
  noticeId: number;
  noticeTitle: string;
  noticeContent: string;
  noticeViews: string;
  noticeStatus: boolean;
  createdAt: string;
}

interface ApiResponse {
  statusCode: string;
  data: {
    totalPages: number;
    totalElements: number;
    notices: Notice[];
  };
}

export default function NoticeSelection() {
  const [notice, setNotice] = useState<Notice[]>([]);
  const [totalNoticeCount, setTotalNoticeCount] = useState<number>(0);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [checkedNotices, setCheckedNotices] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchFeedback(currentPage);
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

  const fetchFeedback = (pageNo: number) => {
    fetchAPI(`/api/notice?pageNo=${pageNo}&Wcriterion=createdAt`, 'GET')
      .then((data: ApiResponse) => {
        setNotice(data.data.notices);
        setTotalPages(data.data.totalPages);
        setTotalNoticeCount(data.data.totalElements);
      })
      .catch((error) => {
        console.error('Error:', error);
        showSuccessToast('에러가 발생했습니다. 잠시 후 다시 시도 해주세요.');
      });
  };

  const handleBack = () => {
    setSelectedNotice(null);
    setIsCreating(false);
    fetchFeedback(0);
  };

  const handleSave = (updatedNotice: Notice) => {
    setNotice(prevFeedback =>
      prevFeedback.map(feedbackItem =>
        feedbackItem.noticeId === updatedNotice.noticeId ? updatedNotice : feedbackItem
      )
    );
    setSelectedNotice(updatedNotice);
    showSuccessToast('수정이 완료되었습니다.');
  };

  const handleCheck = (noticeId: number) => {
    setCheckedNotices(prev => {
      const newCheckedNotices = new Set(prev);
      if (newCheckedNotices.has(noticeId)) {
        newCheckedNotices.delete(noticeId);
      } else {
        newCheckedNotices.add(noticeId);
      }
      return newCheckedNotices;
    });
  };

  const handleDelete = async () => {
    const promises = Array.from(checkedNotices).map(noticeId =>
      fetchAPI(`/api/notice/admin/${noticeId}`, 'DELETE')
    );
    await Promise.all(promises);
    showSuccessToast('선택된 공지가 삭제되었습니다.');
    setCheckedNotices(new Set());
    fetchFeedback(currentPage);
  };

  return (
    <div className="ad-feedbackSelection-container">
      {isCreating ? (
        <NoticeCreate onBack={handleBack} />
      ) : selectedNotice ? (
        <NoticeDetail feedback={selectedNotice} onBack={handleBack} onSave={handleSave} />
      ) : (
        <div className="ad-feedbackSelection">
          <div className='ad-notice-header'>
            <p className="ad-notice-cnt">
              <span className="ad-notice-cnt-num">{totalNoticeCount}</span>건의 공지가
              검색되었습니다.
            </p>
            <button onClick={() => setIsCreating(true)} style={{ margin: 0 }} className='orange-white-btn'>공지 작성하기</button>
          </div>

          <div className="ad-notice-result">
            <ul>
              <li className="ad-notice-searchResult-header">
                <input type="checkbox" disabled />
                <span>번호</span>
                <span>제목</span>
                <span>작성자</span>
                <span>조회</span>
                <span>등록일</span>
              </li>
              {notice.map((company, index) => (
                <React.Fragment key={company.noticeId}>
                  <li
                    key={company.noticeTitle}
                    className="ad-notice-searchResult-item"
                    onClick={() => setSelectedNotice(company)}
                  >
                    <input
                      type="checkbox"
                      checked={checkedNotices.has(company.noticeId)}
                      onChange={() => handleCheck(company.noticeId)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span>{index + 1}</span>
                    <span>{company.noticeTitle}</span>
                    <span>관리자</span>
                    <span>{company.noticeViews}</span>
                    <span>{company.createdAt}</span>
                  </li>
                </React.Fragment>
              ))}
            </ul>
          </div>
          <div className='ad-notice-button-container'>
            <button onClick={handleDelete} className='white-orange-border-btn'>삭제하기</button>
          </div>
          {notice && (
            <AdminPagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePagination={handlePagination}
            />
          )}
        </div>
      )}
    </div>
  );
}
