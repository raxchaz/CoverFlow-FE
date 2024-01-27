import {
  BASE_URL,
  ACCESS_TOKEN,
} from '../../pages/loginPage/constants/index.js';

const request = async (options) => {
  const headers = new Headers({
    'Content-type': 'application/json',
  });

  // 엑세스 토큰이 존재한다면, 인증 절차를 실행합니다.
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

export async function LoggedinUser() {
  try {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      throw new Error('토큰이 존재하지 않습니다.');
    } else {
      window.location.href = '/';
      alert('잘못된 접근입니다.');
    }

    const response = await request({
      url: `${BASE_URL}/member/`,
      method: 'GET',
    });

    // API 요청이 성공한 경우 사용자 정보를 반환하고 콘솔에 메시지를 출력합니다.
    console.log('사용자 정보를 성공적으로 가져왔습니다.');
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('사용자 정보를 가져오는데 실패했습니다.');
  }
}
