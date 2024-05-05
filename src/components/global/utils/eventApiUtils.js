import { EventSourcePolyfill } from 'event-source-polyfill';
import {
  BASE_URL,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  LAST_EVENT_ID,
} from '../constants/index.ts';
import { showSuccessToast } from '../../ui/toast/toast.tsx';
import { reissueTokens } from './reissueTokenUtils.js';
import { fetchUnreadNotificationsCount } from './alertCountUtil.js';
let isConnected = false;

export const initializeSSE = (queryClient, dispatch) => {
  if (isConnected) return;
  isConnected = true;

  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  let lastEventId = localStorage.getItem(LAST_EVENT_ID);

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
    heartbeatTimeout: 3660000,
  });

  sse.addEventListener('connect', (event) => {
    queryClient.invalidateQueries(['notifications']);
    // console.log(event, 'sse');
    fetchUnreadNotificationsCount(dispatch);
    let data;
    try {
      data = JSON.parse(event.data);
      // console.log(data);
    } catch (error) {
      return;
    }

    lastEventId = event.lastEventId;
    localStorage.setItem(LAST_EVENT_ID, lastEventId);
    let message = '';
    if (data && data.type) {
      switch (data.type) {
        case 'ANSWER':
          message = '내 질문에 답변이 달렸어요!';
          break;
        case 'SELECTION':
          message = '내 답변이 채택 되었어요!';
          break;
        case 'INQUIRY':
          message = '내 문의에 답변이 도착했어요!';
          break;
        default:
          message = '새로운 알림이 도착했습니다!';
          break;
      }
    } else {
      message = '서버로부터 유효한 데이터가 전달되지 않았습니다.';
    }

    showSuccessToast(message);
    queryClient.invalidateQueries(['notifications']);
  });

  sse.onerror = (event) => {
    console.log('onerror', event);
    sse.close();
    isConnected = false;
    reissueTokens(queryClient, dispatch);
  };

  return sse;
};
