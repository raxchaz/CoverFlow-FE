import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader.jsx';
import TabBar from '../../ui/tabBar/tabBar.jsx';
import NotificationList from './notificationList.jsx';
import '../../../asset/sass/pages/notificationPage/notificationPage.scss';

function NotificationPage() {
  const navigate = useNavigate();

  const initialNotifications = [];

  const [notifications, setNotifications] = useState(initialNotifications);

  const handleCheckNotification = (index) => {
    const newNotifications = [...notifications];
    newNotifications[index].checked = true;
    setNotifications(newNotifications);
  };

  const handleCheckAllNotifications = () => {
    const newNotifications = notifications.map((notification) => ({
      ...notification,
      checked: true,
    }));
    setNotifications(newNotifications);
  };

  const unreadNotificationsCount = notifications.filter(
    (notification) => !notification.checked,
  ).length;

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="알림" handleGoBack={handleGoBack} />
        <div className="notification-controls">
          <div className="no-read">
            읽지 않은 알림{' '}
            <div className="no-read-count"> {unreadNotificationsCount}</div>
          </div>
          <button
            className="all-read-btn"
            onClick={handleCheckAllNotifications}
          >
            모두 읽음
          </button>
        </div>
      </StyledHeader>
      <NotificationList
        notifications={notifications}
        onCheckNotification={handleCheckNotification}
      />
      <TabBar />
    </StyledPage>
  );
}

export default NotificationPage;
