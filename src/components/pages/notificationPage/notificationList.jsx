import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import '../../../asset/sass/pages/notificationPage/notificationList.scss';
import INQUIRY from '../../../asset/image/notification-question.svg';
import ANSWER from '../../../asset/image/notification-answer.svg';
import SELECTION from '../../../asset/image/notification-adopt.svg';
import DAILY from '../../../asset/image/notification-fishbun.svg';
import { fetchAPI } from '../../global/utils/apiUtil';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchUnreadNotificationsCount } from '../../global/utils/alertCountUtil';
import { useDispatch } from 'react-redux';

function NotificationList({
  notifications,
  isLoading,
  fetchNextPage,
  hasNextPage,
}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const getNotificationDetails = (type) => {
    switch (type) {
      case 'DAILY':
        return { icon: DAILY, message: '출석 붕어빵 5개를 얻었어요!' };
      case 'ANSWER':
        return { icon: ANSWER, message: '내 질문에 답변이 달렸어요!' };
      case 'SELECTION':
        return { icon: SELECTION, message: '내 답변이 채택 되었어요!' };
      case 'INQUIRY':
        return { icon: INQUIRY, message: '내 문의에 답변이 도착했어요!' };
      default:
        return { icon: null, message: '' };
    }
  };
  const dispatch = useDispatch();
  const observer = useRef();
  const lastNotificationRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage, fetchNextPage],
  );

  const checkNotification = (index, uri, type) => {
    fetchAPI('/api/notification', 'PATCH', [{ notificationId: index }])
      .then(() => {
        queryClient.invalidateQueries(['notifications']);
        fetchUnreadNotificationsCount(dispatch);
        if (type === 'INQUIRY') {
          navigate(uri, { state: { list: 'list' } });
        } else if (type !== 'DAILY' && uri) {
          navigate(uri);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="notification-list">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className={`notification-item ${notification.read ? 'checked' : 'unchecked'}`}
          ref={index === notifications.length - 1 ? lastNotificationRef : null}
          onClick={() =>
            checkNotification(
              notification.id,
              notification.uri,
              notification.type,
            )
          }
        >
          <img
            src={getNotificationDetails(notification.type).icon}
            alt={`${notification.type} icon`}
            className="notification-icon"
          />
          <div className="title-time">
            <span className="notification-title">
              {getNotificationDetails(notification.type).message}
            </span>
            <span className="notification-time">{notification.createdAt}</span>
          </div>
          <span className="notification-company">{notification.content}</span>
        </div>
      ))}
    </div>
  );
}

NotificationList.propTypes = {
  notifications: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  fetchNextPage: PropTypes.func.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
};
export default NotificationList;
