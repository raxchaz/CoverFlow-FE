import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Base64 } from 'react-base64';

const decodeToken = (token) => {
  const payload = token.split('.')[1];
  const decodedPayload = Base64.decode(payload);
  const decodedToken = JSON.parse(decodedPayload);
  return decodedToken;
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

const fetchToken = async (navigate, location) => {
  try {
    const response = await axios.get('https://coverflow.co.kr/api/auth/token');
    const data = response.data;

    console.log('액세스 토큰:', data.accessToken);
    console.log('리프레시 토큰:', data.refreshToken);

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    if (data.accessToken && data.refreshToken) {
      const payload = data.accessToken.substring(
        data.accessToken.indexOf('.') + 1,
        data.accessToken.lastIndexOf('.'),
      );
      const decodedToken = decodeToken(payload);
      const userRole = determineUserRole(decodedToken);

      console.log('디코딩된 토큰:', decodedToken);
      console.log('사용자 역할:', userRole);

      if (userRole === 'GUEST') {
        navigate('/login/member-info');
      } else if (userRole === 'MEMBER' || userRole === 'ADMIN') {
        navigate(-1); // 이전 페이지로 이동하게 되는 로직
      }
    }
  } catch (error) {
    console.error('토큰을 성공적으로 받지 못했어요', error);
  }
};

const TokenManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();

  fetchToken(navigate, location);

  return null;
};

export default TokenManagement;
