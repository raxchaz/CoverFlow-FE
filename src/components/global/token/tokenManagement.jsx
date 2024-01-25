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
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      const decodedAccessToken = decodeToken(accessToken);
      const decodedRefreshToken = decodeToken(refreshToken);

      const userRole = determineUserRole(decodedAccessToken);

      console.log('디코딩된 액세스 토큰:', decodedAccessToken);
      console.log('디코딩된 리프레시 토큰:', decodedRefreshToken);
      console.log('사용자 역할:', userRole);

      if (userRole === 'GUEST') {
        navigate('/login/member-info');
      } else if (userRole === 'MEMBER' || userRole === 'ADMIN') {
        navigate(-1); // 이전 페이지로 이동하게 되는 로직
      }
    } else {
      console.error('토큰이 존재하지 않습니다.');
      // 토큰이 없을 경우 예외 처리
    }
  }, [navigate, location]);

  return null;
};

export default TokenManagement;
