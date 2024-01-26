import {
  BASE_URL,
  ACCESS_TOKEN,
} from '../../pages/loginPage/constants/index.js';

// HTTP 요청 보내는 request 함수를 정의하는 부분 [비동기]
// application/json = 해당 요청이 Json 형식의 데이터를 포함하고 있다는 것을 나타냄
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

  /*
    아래는 객체 병합 과정인데, 이 과정이 필요한 이유는
    사용자 개인의 input값과 기본값인 빈 문자열 ("")이 병합되어 새로운 객체가 만들어지기 때문!
    이렇게 병합된 객체에는 (예시) 아이디와 비밀번호가 저장되어있어 로그인 기능에 사용될 수 있다.
    */
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
