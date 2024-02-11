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

  // 토큰의 권한을 확인하고 관리자&멤버인지, 게스트인지 판별합니다.
  const determineUserRole = (decodedToken) => {
    const userRole = decodedToken.role;

    if (userRole === 'MEMBER' || userRole === 'ADMIN') {
      console.log('토큰이 존재하고 멤버 또는 관리자로 인식됨');
      return userRole;
    } else {
      console.log('토큰이 존재하지 않거나 권한이 없어 GUEST로 인식됨');
      return 'GUEST';
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const encodedAccessToken = query.get(ACCESS_TOKEN);
    const encodedRefreshToken = query.get(REFRESH_TOKEN);

    localStorage.setItem(ACCESS_TOKEN, encodedAccessToken);
    localStorage.setItem(REFRESH_TOKEN, encodedRefreshToken);

    const decodedAccessToken = decodeToken(encodedAccessToken);
    const decodedRefreshToken = decodeToken(encodedRefreshToken);
    console.log('디코딩된 리프레시 토큰:', decodedRefreshToken);

    // 로그인 상태를 확인하고, 사용자의 역할에 따라 다른 동작을 수행하도록 합니다.
    const userRole = determineUserRole(decodedAccessToken);

    // 첫 로그인이면서 게스트로 인식된 경우, member-info 페이지로 이동합니다.
    const prevPage = localStorage.getItem('prevPage');

    if (userRole === 'GUEST' && !localStorage.getItem('prevPage')) {
      console.log('첫 로그인으로 인식되어 정보 등록 페이지로 이동합니다.');
      navigate('/login/member-info');
    } else if (userRole === 'MEMBER' || userRole === 'ADMIN') {
      console.log('멤버 또는 관리자로 인식됨');
      console.log('회원 정보가 존재합니다.');

      if (prevPage) {
        localStorage.removeItem('prevPage'); // 리다이렉트 후에는 정보를 삭제합니다.
        navigate(prevPage);
      } else {
        navigate('/'); // 이전 페이지가 없다면 메인 페이지로 이동하게 됩니다.
      }
    } else {
      console.log('토큰이 존재하지 않아 GUEST로 인식되었습니다.');
      navigate('/login');
      alert('로그인에 실패하였습니다. 다시 시도해주세요.');
    }
  }, [navigate, location]);
  return null;
};

export default TokenManagement;
