import {
  BASE_URL,
  ACCESS_TOKEN,
} from '../../pages/loginPage/constants/index.js';

const request = async (options) => {
  const headers = new Headers({
    'Content-type': 'application/json',
  });

  // 엑세스 토큰이 존재한다면, 인증 절차 실행
  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      'Authorization',
      `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    );
  }

  const defaults = { headers };
  options = Object.assign({}, defaults, options);
  // default 객체는 기본적인 요청 설정을 담고 있는 부분!

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        const error = new Error(json.message || '요청이 실패했습니다.');
        error.response = response;
        throw error;
      }
      return json;
    }),
  );
};

// 로그인한 사용자의 엑세스 토큰이 설정되어 있지 않을 경우 에러 발생  [비동기]
export function LoggedinUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject(new Error('토큰이 존재하지 않습니다.'));
  }

  // API 요청이 실패한 경우에 대한 오류 처리
  return request({
    url: `${BASE_URL}/member/`,
    method: 'GET',
  }).catch((error) => {
    console.error(error);
    throw new Error('사용자 정보를 가져오는데 실패했습니다.');
  });
}
