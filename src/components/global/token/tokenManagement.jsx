import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Base64 } from 'react-base64';

const decodeToken = (token) => {
  const payload = token.split('.')[1];
  const decodedPayload = Base64.decode(payload);
  return JSON.parse(decodedPayload);
};

const determineUserRole = (decodedToken) => {
  console.log('디코딩된 토큰:', decodedToken);

  if (decodedToken.role === 'ADMIN') {
    console.log('관리자로 인식됨');
    return 'ADMIN';
  } else if (decodedToken.role === 'MEMBER') {
    console.log('회원으로 인식됨');
    return 'MEMBER';
  }

  console.log('게스트로 인식됨');
  return 'GUEST';
};

const TokenManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const encodedAccessToken = query.get('access_token');
    const encodedRefreshToken = query.get('refresh_token');

    // 로컬 스토리지에 토큰 저장
    localStorage.setItem('access_token', encodedAccessToken);
    localStorage.setItem('refresh_token', encodedRefreshToken);

    if (encodedAccessToken && encodedRefreshToken) {
      const decodedAccessToken = decodeToken(encodedAccessToken);
      const decodedRefreshToken = decodeToken(encodedRefreshToken);

      console.log('디코딩된 리프레시 토큰:', decodedRefreshToken);

      const userRole = determineUserRole(decodedAccessToken);

      if (userRole === 'MEMBER' || userRole === 'ADMIN') {
        navigate(-1); // 이전 페이지로 이동하게 되는 로직
      } else if (userRole === 'GUEST') {
        navigate('/login/member-info');
      }
    } else {
      console.error('토큰이 존재하지 않습니다.');
      // 토큰이 없을 경우 예외 처리
    }
  }, [navigate, location]);

  return null;
};

export default TokenManagement;
