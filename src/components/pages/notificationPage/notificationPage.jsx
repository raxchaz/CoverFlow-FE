import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../asset/sass/pages/notificationPage/notificationPage.scss';
import { ACCESS_TOKEN } from '../../pages/loginPage/constants/index.js';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader.jsx';

function NotificationPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      // 로그인 전에 알림 페이지의 URL을 저장
      localStorage.setItem('notificationPageURL', '/notification');
      navigate('/login');
    }
  }, [navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="알림" handleGoBack={handleGoBack} />
      </StyledHeader>
    </StyledPage>
  );
}

export default NotificationPage;
