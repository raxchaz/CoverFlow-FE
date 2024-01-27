import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Base64 } from 'js-base64';

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

    if (!encodedAccessToken || !encodedRefreshToken) {
      console.error('토큰이 존재하지 않습니다.');
      console.log('게스트로 인식됨');
      navigate('/login');
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
      return;
    }

    const decodedAccessToken = decodeToken(encodedAccessToken);
    const decodedRefreshToken = decodeToken(encodedRefreshToken);

    console.log('디코딩된 리프레시 토큰:', decodedRefreshToken);

    const userRole = determineUserRole(decodedAccessToken);

    if (userRole === 'MEMBER' || userRole === 'ADMIN') {
      console.log('멤버 또는 관리자로 인식됨');

      // 나이, 성별, 태그 정보의 존재를 확인합니다..
      const { age, gender, tag } = decodedAccessToken;

      if (age && gender && tag) {
        console.log('나이, 성별, 태그 정보가 존재합니다.');
        navigate('/');
      } else {
        console.log('나이, 성별, 태그 정보가 존재하지 않습니다.');
        navigate('/login/member-info');
      }
    } else if (userRole === 'GUEST') {
      console.log('토큰이 존재하지 않아 GUEST로 인식되었습니다.');
      navigate('/login');
      alert('로그인에 실패하였습니다. 다시 시도해주세요.');
    }
  }, [navigate, location]);

  return null;
};

export default TokenManagement;
