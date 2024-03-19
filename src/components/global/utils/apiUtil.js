import {
  BASE_URL,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  TOKEN_EXPIRES_IN,
} from '../constants/index.ts';
import { store } from '../../../store';
import { setTokens } from '../../../store/actions/authActions';

const request = async (options) => {
  const headers = new Headers({
    'Content-type': 'application/json',
  });

  /* 엑세스 토큰이 존재한다면, 인증 절차를 진행합니다 */
  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      'Authorization',
      `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    );
  }

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        const error = new Error(json.message || '요청 처리 실패.');
        error.response = response;
        throw error;
      }
      return json;
    }),
  );
};

/* 사용자가 로그인 되어있는지 확인하고, 사용자 데이터를 가져오는 함수 */
export function LoggedinUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject(new Error('토큰이 존재하지 않습니다.'));
  }

  // 사용자 정보를 가져오기 위한 API 요청
  return request({
    url: `${BASE_URL}/api/member`,
    method: 'GET',
  }).catch((error) => {
    console.error(error);
    throw new Error('사용자 정보를 가져오는데 실패했습니다.');
  });
}

const isTokenExpired = () => {
  const { expiresAt } = store.getState().auth;
  return new Date().getTime() > expiresAt;
};

// API 요청을 위한 범용 함수
// 사용예시

// 1. GET, DELETE : fetchAPI('/API 주소', 'GET').then(response => {데이터처리 로직}
// 2. POST, PUTfetchAPI('/API 주소', 'POST', postData).then(response => {데이터처리 로직}

export const fetchAPI = async (endpoint, method, body = null) => {
  // const { accessToken, refreshToken } = store.getState().auth;
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  const headers = new Headers({
    'Content-Type': 'application/json',
  });
  const apiLink = `${BASE_URL}${endpoint}`;

  if (!accessToken) {
    throw new Error('토큰이 존재하지 않습니다.');
  }

  // 토큰이 만료되었다면 리프레시 토큰도 헤더에 추가
  if (isTokenExpired() && refreshToken) {
    console.log('토큰 시간 만료');
    headers.append('Authorization', `Bearer ${accessToken}`);
    headers.append('Authorization-refresh', `Bearer ${refreshToken}`);
  } else if (accessToken) {
    headers.append('Authorization', `Bearer ${accessToken}`);
  }

  const response = await fetch(apiLink, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(response.message || '요청 처리 실패');
  } else {
    // 응답 헤더에서 새로운 액세스 토큰과 리프레시 토큰을 확인하고 저장
    if (isTokenExpired()) {
      const newAccessToken = response.headers.get('Authorization');
      const newRefreshToken = response.headers.get('Authorization-refresh');
      console.log('newAccessToken', newAccessToken);
      console.log('newRefreshToken', newRefreshToken);

      if (newAccessToken && newRefreshToken) {
        localStorage.setItem(ACCESS_TOKEN, newAccessToken);
        localStorage.setItem(REFRESH_TOKEN, newRefreshToken);
        const expiresAt = new Date().getTime() + TOKEN_EXPIRES_IN * 1000;
        store.dispatch(setTokens(newAccessToken, newRefreshToken, expiresAt));
        console.log('토큰 다시 발급됨', localStorage.getItem('ACCESS_TOKEN'));
      }
    }
  }
  return responseData;
};
