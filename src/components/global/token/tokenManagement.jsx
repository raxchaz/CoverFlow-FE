import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Base64 } from 'js-base64';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/index';

// 주어진 토큰을 디코딩하고 페이로드를 추출하여 JS 객체로 반환합니다.
const decodeToken = (token) => {
  const payload = token.split('.')[1];
  const decodedPayload = Base64.decode(payload);
  return JSON.parse(decodedPayload);
};

// URL에 포함되어있는 토큰을 뜯어서 localstorage에 저장하고, 디코딩합니다.
const TokenManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 액세스 토큰의 권한(GUEST,MEMBER,PREMIUM,ADMIN)을 확인합니다.
  const determineUserRole = (decodedAccessToken) => {
    const userRole = decodedAccessToken.role;

    if (
      userRole === 'MEMBER' ||
      userRole === 'PREMIUM' ||
      userRole === 'ADMIN'
    ) {
      console.log('일반, 프리미엄, 관리자 유저로 인식됨');
      return userRole;
    } else {
      console.log('GUEST로 인식됨');
      return 'GUEST';
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);

    // const code = query.get('code');
    // const role = query.get('role');
    // if (!code) {
    //   alert('코드가 포함되어 있지 않습니다.');
    //   return;
    // } else {
    //   console.log('코드', code, '상태', role);
    // }

    const accessToken = query.get(ACCESS_TOKEN);
    const refreshToken = query.get(REFRESH_TOKEN);

    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);

    const decodedAccessToken = decodeToken(accessToken);

    // 회원의 권한에 따라 다른 동작을 수행하도록 합니다.
    const userRole = determineUserRole(decodedAccessToken);

    // 이전 페이지를 불러옵니다.
    const prevPage = localStorage.getItem('prevPage');

    if (userRole === 'GUEST') {
      console.log('정보 등록 페이지로 이동합니다.');
      navigate('/login/member-info');
    } else if (
      userRole === 'MEMBER' ||
      userRole === 'PREMIUM' ||
      userRole === 'ADMIN'
    ) {
      console.log('회원 정보가 존재합니다.');

      if (prevPage) {
        navigate(prevPage);
      }
    } else {
      // 권한도 없고 어떤 예외가 발생했을 경우
      alert('로그인에 실패하였습니다. 다시 시도해주세요.');
      navigate('/login');
    }
  }, [navigate, location]);
  return null;
};

export default TokenManagement;
