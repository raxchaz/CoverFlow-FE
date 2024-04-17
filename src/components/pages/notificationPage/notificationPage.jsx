import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledPage, StyledHeader } from '../../../styledComponent';
import TitleHeader from '../../ui/header/titleHeader.tsx';
import TabBar from '../../ui/tabBar/tabBar';
import NotificationList from './notificationList.jsx';
import '../../../asset/sass/pages/notificationPage/notificationPage.scss';
import { fetchAPI } from '../../global/utils/apiUtil.js';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { alertCount } from '../../../store/actions/alertActions.js';
import { showErrorToast } from '../../ui/toast/toast.tsx';

function NotificationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => fetchAPI('/api/notification', 'GET'),
  });

  useEffect(() => {
    if (data && data.data) {
      dispatch(alertCount(data.data.noReadElements));
      // console.log(data.data);
    }
  }, [data, dispatch]);

  if (isError) {
    showErrorToast(error);
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  const checkALLNotification = () => {
    const unreadNotifications = data?.data?.notificationList
      .filter((notification) => notification.read === false)
      .map((notification) => ({ notificationId: notification.id }));
    fetchAPI('/api/notification', 'PATCH', unreadNotifications)
      .then(() => {
        queryClient.invalidateQueries(['notifications']);
      })
      .catch((error) => {
        showErrorToast(error);
      });
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="알림" handleGoBack={handleGoBack} />
        <div className="notification-controls">
          <div className="no-read">
            읽지 않은 알림{' '}
            <div className="no-read-count">
              {data?.data?.noReadElements || 0}{' '}
            </div>
          </div>
          <div className="all-read-btn" onClick={checkALLNotification}>
            모두 읽음
          </div>
        </div>
      </StyledHeader>
      <NotificationList
        notifications={data?.data?.notificationList || []}
        isLoading={isLoading}
      />
      <TabBar />
    </StyledPage>
  );
}

export default NotificationPage;
