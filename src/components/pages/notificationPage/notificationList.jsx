import React from 'react';
import PropTypes from 'prop-types';
import '../../../asset/sass/pages/notificationPage/notificationList.scss';

function NotificationList({ notifications, onCheckNotification }) {
  return (
    <div className="notification-list">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className={`notification-item ${notification.checked ? 'checked' : 'unchecked'}`}
          onClick={() => onCheckNotification(index)}
        >
          <span className="notification-icon">dk</span>
          <div className="title-time">
            <span className="notification-title">답변이 달렸어요</span>
            <span className="notification-time">10분 전</span>
          </div>
          <span className="notification-company">카카오뱅크</span>
        </div>
      ))}
    </div>
  );
}

NotificationList.propTypes = {
  notifications: PropTypes.array.isRequired,
  onCheckNotification: PropTypes.func.isRequired,
};

export default NotificationList;
