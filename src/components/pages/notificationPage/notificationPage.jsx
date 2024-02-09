import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Back from '../../../asset/image/back.svg';
import '../../../asset/sass/pages/notificationPage/notificationPage.scss';
import { ACCESS_TOKEN } from '../../pages/loginPage/constants/index.js';
import { StyledPage, Heading } from '../../../styledComponent.js';

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

  const handleNotificationClick = () => {
    navigate('/notification');
  };

  return (
    <StyledPage className="main-page-container">
      <Heading>
        <img
          className="back"
          src={Back}
          onClick={handleGoBack}
          alt="뒤로 가기"
        />
        <span onClick={handleNotificationClick}>알림</span>
      </Heading>
    </StyledPage>
  );
}

export default NotificationPage;
