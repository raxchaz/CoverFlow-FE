import { EventSourcePolyfill } from 'event-source-polyfill';
import { BASE_URL, ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/index.ts';
import { showSuccessToast } from '../../ui/toast/toast.tsx';

export const initializeSSE = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  let lastEventId = null;

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

  sse.onerror = (event) => {
    console.log('onerror', event);
    sse.close();
    setTimeout(initializeSSE, 5000);
  };

  return sse;
};
