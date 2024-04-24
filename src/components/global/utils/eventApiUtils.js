import { EventSourcePolyfill } from 'event-source-polyfill';
import { BASE_URL, ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/index.ts';
import { showSuccessToast } from '../../ui/toast/toast.tsx';
import { useApi } from './apiUtil.js';

export const initializeSSE = () => {
  let accessToken = localStorage.getItem(ACCESS_TOKEN);
  let lastEventId = null;
  const { fetchAPI } = useApi();

  if (!accessToken) {
    console.log('토큰이 없어서 연결을 시작할 수 없습니다.');
    return;
  }

  const sse = new EventSourcePolyfill(`${BASE_URL}/api/notification/connect`, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
      Connection: 'keep-alive',
      ...(lastEventId
        ? {
            'Last-Event-ID': lastEventId,
            'Authorization-refresh': `Bearer ${localStorage.getItem(REFRESH_TOKEN)}`,
          }
        : {}),
    },
    heartbeatTimeout: 3600000,
  });

  sse.addEventListener('connect', (event) => {
    const data = event;
    console.log('ssedata', data);
    lastEventId = event.lastEventId;
    showSuccessToast(data);
  });

  sse.onerror = async (event) => {
    console.log('SSE 오류', event);

    try {
      await fetchAPI('/api/auth/reissue', 'GET');
      accessToken = localStorage.getItem(ACCESS_TOKEN);
      setTimeout(initializeSSE, 5000);
      console.log('SSE 재연결 성공');
    } catch (error) {
      console.error('토큰 재발급 실패: ', error);
    }
  };

  return sse;
};
