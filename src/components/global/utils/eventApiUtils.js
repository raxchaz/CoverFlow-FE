import { EventSourcePolyfill } from 'event-source-polyfill';
import { BASE_URL, ACCESS_TOKEN } from '../constants/index.ts';

export const initializeSSE = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

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
    },
    heartbeatTimeout: 120000,
  });

  const handleConnect = async () => {
    const res = await fetch(`${BASE_URL}/api/notification/connect`, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('res', res);
  };
  sse.addEventListener('connect', (event) => {
    const data = event;
    console.log('ssedata', data);
  });
  sse.onmessage = (e) => {
    console.log('onmessage', e);
  };
  sse.onerror = (event) => {
    console.log('onerror', event);
    sse.close();
  };

  handleConnect();
  return sse;
};
