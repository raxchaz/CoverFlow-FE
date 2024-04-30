import { EventSourcePolyfill } from 'event-source-polyfill';
import {
  BASE_URL,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  TOKEN_EXPIRES_IN,
  LAST_EVENT_ID,
} from '../constants/index.ts';
import { showSuccessToast } from '../../ui/toast/toast.tsx';
import { setTokens } from '../../../store/actions/authActions.js';
import { store } from '../../../store/index.js';
let isConnected = false;

export const initializeSSE = (queryClient) => {
  if (isConnected) return;
  isConnected = true;

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
    queryClient.invalidateQueries(['notifications']);
    let data;
    try {
      data = JSON.parse(event.data);
    } catch (error) {
      return;
    }

    console.log('알림 타입', data.type);
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
    reissueTokens();
  };

  return sse;
};

const reissueTokens = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/reissue`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        'Authorization-refresh': `Bearer ${localStorage.getItem(REFRESH_TOKEN)}`,
      },
    });

    if (response.ok) {
      const newAccessToken = response.headers.get('Authorization');
      const newRefreshToken = response.headers.get('Authorization-refresh');
      localStorage.setItem(ACCESS_TOKEN, newAccessToken);
      localStorage.setItem(REFRESH_TOKEN, newRefreshToken);
      const expiresAt = new Date().getTime() + TOKEN_EXPIRES_IN * 1000;
      store.dispatch(setTokens(newAccessToken, newRefreshToken, expiresAt));
      setTimeout(initializeSSE, 1000);
    } else {
      throw new Error('토큰 재발급 실패');
    }
  } catch (error) {
    console.error('토큰 재발급 오류:', error);
    setTimeout(reissueTokens, 5000);
  }
};
