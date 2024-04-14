import { useEffect } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { BASE_URL, ACCESS_TOKEN } from '../constants/index.ts';
import { showSuccessToast } from '../../ui/toast/toast.tsx';
import { useQueryClient } from '@tanstack/react-query';

export const useInitializeSSE = (active) => {
  const queryClient = useQueryClient();
  // console.log('연결 시작 전.', active);

  useEffect(() => {
    if (!active) return;
    // console.log('연결을 시작합니다.', active);
    let lastEventId = null;
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (!accessToken) {
      console.log('토큰이 없어서 연결을 시작할 수 없습니다.');
      return;
    }

    const sse = new EventSourcePolyfill(
      `${BASE_URL}/api/notification/connect`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'text/event-stream; charset=utf-8',
          Authorization: `Bearer ${accessToken}`,
          Connection: 'keep-alive',
          ...(lastEventId ? { 'Last-Event-ID': lastEventId } : {}),
        },
        heartbeatTimeout: 3600000,
      },
    );

    sse.addEventListener('message', (event) => {
      const data = event.data;
      console.log('연결에 성공했습니다.', event);
      showSuccessToast(data);
      queryClient.invalidateQueries(['notifications']);
      lastEventId = event.lastEventId;
    });

    sse.addEventListener('error', (event) => {
      console.log('Error:', event);
      sse.close();
      setTimeout(() => useInitializeSSE(active), 5000);
    });

    return () => {
      sse.close();
    };
  }, [active]);
};
