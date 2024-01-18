import React from 'react';
import styled from 'styled-components';
import Back from '../../../asset/image/back.svg';
import '../../../asset/sass/pages/notificationPage/notificationPage.scss';

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
  margin-left: -30%;
  margin-right: 32%;
  cursor: pointer;
`;

function NotificationPage() {
  const handleGoBack = () => {
    window.history.back();
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
        알림{' '}
      </NotificationHeading>
    </StyledNotificationPage>
  );
}

export default NotificationPage;
