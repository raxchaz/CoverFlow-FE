import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledPage, StyledHeader } from '../../../styledComponent';
import TitleHeader from '../../ui/header/titleHeader.tsx';
import TabBar from '../../ui/tabBar/tabBar';
import NotificationList from './notificationList.jsx';
import '../../../asset/sass/pages/notificationPage/notificationPage.scss';
import { fetchAPI } from '../../global/utils/apiUtil.js';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { alertCount } from '../../../store/actions/alertActions.js';
import { showErrorToast } from '../../ui/toast/toast.tsx';

function NotificationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => fetchAPI('/api/notification', 'GET'),
  });

  useEffect(() => {
    if (data && data.data) {
      dispatch(alertCount(data.data.noReadElements));
    }
  }, [data, dispatch]);

  if (isError) {
    showErrorToast(error);
  }

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
            <div className="no-read-count">
              {data?.data?.noReadElements || 0}{' '}
            </div>
          </div>
          <button className="all-read-btn">모두 읽음</button>
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
