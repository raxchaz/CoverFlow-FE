import React, { useState } from 'react';
import './adminSideTap.scss';
import { ReactComponent as UserIcon } from '../../../asset/image/admin-user.svg';
import { ReactComponent as AdminLogo } from '../../../asset/image/admin-logo.svg';
import { ReactComponent as AdminCompany } from '../../../asset/image/admin-company.svg';
import { ReactComponent as AdminQuestion } from '../../../asset/image/admin-question.svg';
import { ReactComponent as AdminAnswer } from '../../../asset/image/admin-answer.svg';
import { ReactComponent as AdminComment } from '../../../asset/image/admin-comment.svg';
import { ReactComponent as AdminContact } from '../../../asset/image/admin-contact.svg';
import { ReactComponent as AdminReport } from '../../../asset/image/admin-report.svg';
import { ReactComponent as AdminNotice } from '../../../asset/image/admin-notice.svg';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../global/constants/index.ts';
import { fetchAPI } from '../../global/utils/apiUtil.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoggedIn } from '../../../store/actions/userActions.js';
import { showErrorToast } from '../toast/toast.tsx';

interface AdminSideTapProps {
  loadSection: (sectionName: string) => void;
}

export default function AdminSideTap({ loadSection }: AdminSideTapProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedSection, setSelectedSection] = useState<string>('');

  const handleSectionClick = (sectionName: string) => {
    loadSection(sectionName);
    setSelectedSection(sectionName);
  };

  const getContainerStyle = (
    sectionName: string,
    additionalSectionName?: string,
  ) => {
    return sectionName === selectedSection ||
      additionalSectionName === selectedSection
      ? {
          backgroundColor: 'rgba(255, 244, 233, 1)',
          color: 'rgba(255, 141, 29, 1)',
        }
      : {};
  };

  // const logout = () => {
  //   localStorage.removeItem(ACCESS_TOKEN);
  //   localStorage.removeItem(REFRESH_TOKEN);
  //   dispatch(setLoggedIn(false));
  //   navigate('/');
  // };

  const logout = async () => {
    console.log('로그아웃 요청 시작');
    try {
      await fetchAPI('/api/member/logout', 'PATCH');

      console.log('로그아웃 성공');
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      dispatch(setLoggedIn(false));
      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      showErrorToast('로그아웃에 실패했습니다.');
    }
  };

  return (
    <div className="admin-sidebar">
      <AdminLogo />
      <div className="admin-router">
        <div
          className="admin-container"
          style={getContainerStyle('users')}
          onClick={() => handleSectionClick('users')}
        >
          <UserIcon />
          <span
            className={`admin-text ${selectedSection === 'users' ? 'selected' : ''}`}
          >
            회원 관리
          </span>
        </div>
        <div
          className="admin-container"
          style={getContainerStyle('company')}
          onClick={() => handleSectionClick('company')}
        >
          <AdminCompany />
          <span
            className={`admin-text ${selectedSection === 'company' ? 'selected' : ''}`}
          >
            기업 관리
          </span>
        </div>
        <div
          className="admin-container"
          style={getContainerStyle('question')}
          onClick={() => handleSectionClick('question')}
        >
          <AdminQuestion />
          <span
            className={`admin-text ${selectedSection === 'question' ? 'selected' : ''}`}
          >
            질문 관리
          </span>
        </div>
        <div
          className="admin-container"
          style={getContainerStyle('answer')}
          onClick={() => handleSectionClick('answer')}
        >
          <AdminAnswer />

          <span
            className={`admin-text ${selectedSection === 'answer' ? 'selected' : ''}`}
          >
            답변 관리
          </span>
        </div>
        <div
          className="admin-container"
          style={getContainerStyle('comments')}
          onClick={() => handleSectionClick('comments')}
        >
          <AdminComment />
          <span
            className={`admin-text ${selectedSection === 'comments' ? 'selected' : ''}`}
          >
            댓글 관리
          </span>
        </div>
        <div
          style={getContainerStyle('contact', 'feedback')}
          onClick={() => handleSectionClick('contact')}
        >
          <div className="admin-container">
            <AdminContact />
            <span
              className={`admin-text ${
                selectedSection === 'contact' || selectedSection === 'feedback'
                  ? 'selected'
                  : ''
              }`}
            >
              문의 관리
            </span>
          </div>
          {(selectedSection === 'contact' ||
            selectedSection === 'feedback') && (
            <div className="admin-contact-container">
              <span
                className={`admin-sub-text ${selectedSection === 'contact' ? 'selected' : ''}`}
                onClick={(event) => {
                  event.stopPropagation();
                  handleSectionClick('contact');
                }}
              >
                문의 관리
              </span>
              <span
                className={` admin-sub-text ${selectedSection === 'feedback' ? 'selected' : ''}`}
                onClick={(event) => {
                  event.stopPropagation();
                  handleSectionClick('feedback');
                }}
              >
                피드백 관리
              </span>
            </div>
          )}
        </div>

        <div
          className="admin-container"
          style={getContainerStyle('report')}
          onClick={() => handleSectionClick('report')}
        >
          <AdminReport />

          <span
            className={`admin-text ${selectedSection === 'report' ? 'selected' : ''}`}
          >
            신고 관리
          </span>
        </div>
        <div
          className="admin-container"
          style={getContainerStyle('notification')}
          onClick={() => handleSectionClick('notification')}
        >
          <AdminNotice />
          <span
            className={`admin-text ${selectedSection === 'notification' ? 'selected' : ''}`}
          >
            공지 관리
          </span>
        </div>
      </div>
      <span className="admin-logout" onClick={logout}>
        로그아웃
      </span>
    </div>
  );
}
