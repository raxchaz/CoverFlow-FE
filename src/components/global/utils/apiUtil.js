import {
  API_BASE_URL,
  ACCESS_TOKEN,
} from '../../pages/loginPage/constants/index.js';

const request = async (options) => {
  const headers = new Headers({
    'Content-type': 'application/json',
  });

  // 엑세스 토큰이 존재한다면, 인증 절차를 진행합니다
  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      'Authorization',
      `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    );
  }

  const defaults = { headers };
  options = Object.assign({}, defaults, options);

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

// 사용자가 로그인 되어있는지 확인하고, 사용자 데이터를 가져오는 함수
export function LoggedinUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject(new Error('토큰이 존재하지 않습니다.'));
  }

  // 사용자 정보를 가져오기 위한 API 요청
  return request({
    url: `${API_BASE_URL}/api/member/`,
    method: 'GET',
  }).catch((error) => {
    console.error(error);
    throw new Error('사용자 정보를 가져오는데 실패했습니다.');
  });
}
