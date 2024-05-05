import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledPage, StyledHeader } from '../../../styledComponent';
import TitleHeader from '../../ui/header/titleHeader.tsx';
import TabBar from '../../ui/tabBar/tabBar';
import NotificationList from './notificationList.jsx';
import '../../../asset/sass/pages/notificationPage/notificationPage.scss';
import { fetchAPI } from '../../global/utils/apiUtil.js';
import { useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { alertCount } from '../../../store/actions/alertActions.js';
import { showErrorToast } from '../../ui/toast/toast.tsx';
// import { initializeSSE } from '../../global/utils/eventApiUtils.js';

function fetchNotifications({ pageParam = '' }) {
  return fetchAPI(`/api/notification${pageParam}`, 'GET');
}

function NotificationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data,
    isError,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: ({ pageParam }) => fetchNotifications({ pageParam }),
    getNextPageParam: (lastPage) => {
      const lastId = lastPage.data?.notificationList?.slice(-1)[0]?.id;
      return lastId ? `?lastId=${lastId}` : undefined;
    },
    staleTime: 0,
    gcTime: 1000 * 60 * 5,
    onSuccess: (data) => {
      if (data?.pages) {
        const noReadElements = data.pages.reduce(
          (total, page) => total + (page.data.noReadElements || 0),
          0,
        );
        dispatch(alertCount(noReadElements));
      }
    },
  });
  const [noReadElements, setNoReadElements] = useState(0);

  useEffect(() => {
    if (data?.pages) {
      const noReadElements = data.pages.reduce(
        (total, page) => total + (page.data.noReadElements || 0),
        0,
      );
      setNoReadElements(noReadElements);
      dispatch(alertCount(noReadElements));
    }
  }, [data, dispatch]);

  // useEffect(() => {
  //   if (data && data.data) {
  //     dispatch(alertCount(data.data.noReadElements));
  //   }
  // }, [data, dispatch]);

  if (isError) {
    showErrorToast(error);
  }

  const handleGoBack = () => {
    navigate(-1);
  };
  const checkALLNotification = () => {
    if (!data?.pages) return;

    const unreadNotifications = data.pages
      .map((page) => page.data.notificationList)
      .flat()
      .filter((notification) => !notification.read)
      .map((notification) => ({ notificationId: notification.id }));

    fetchAPI('/api/notification', 'PATCH', unreadNotifications)
      .then(() => {
        queryClient.invalidateQueries(['notifications']);
      })
      .catch((error) => {
        showErrorToast(error);
      });
  };

  if (isLoading || !data?.pages) {
    return <div>로딩 중</div>;
  }

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="알림" handleGoBack={handleGoBack} />
        {/* <button onClick={() => initializeSSE(queryClient, dispatch)}>
          initializeSSE
        </button> */}
        <div className="notification-controls">
          <div className="no-read">
            읽지 않은 알림{' '}
            <div className="no-read-count">{noReadElements || 0} </div>
          </div>
          <div className="all-read-btn" onClick={checkALLNotification}>
            모두 읽음
          </div>
        </div>
      </StyledHeader>
      <NotificationList
        notifications={data.pages
          .map((page) => page.data.notificationList)
          .flat()}
        isLoading={isLoading || isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
      <TabBar />
    </StyledPage>
  );
}

export default NotificationPage;
