import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Back from '../../../asset/image/back.svg';
import '../../../asset/sass/pages/notificationPage/notificationPage.scss';
import { ACCESS_TOKEN } from '../../pages/loginPage/constants/index.js';

const StyledNotificationPage = styled.div`
  position: relative;
  height: 100vh;
  background-color: #ffffff;
`;

const NotificationHeading = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1rem;
  margin-top: 10%;
  letter-spacing: -1px;
  font-weight: 600;
`;

const BackButton = styled.img`
  margin-left: -25%;
  margin-right: 25%;
  cursor: pointer;
`;

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
    <StyledNotificationPage className="main-page-container">
      <NotificationHeading>
        <BackButton
          className="back"
          src={Back}
          onClick={handleGoBack}
          alt="뒤로 가기"
        />
        <span onClick={handleNotificationClick}>알림</span>
      </NotificationHeading>
    </StyledNotificationPage>
  );
}

export default NotificationPage;
