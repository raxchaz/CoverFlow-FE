import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const fetchToken = async (navigate) => {
  try {
    const response = await axios.get('coverflow.co.kr/api/auth/token');
    const data = response.data;

    console.log('Access Token:', data.accessToken);
    console.log('Refresh Token:', data.refreshToken);

    // 토큰을 로컬 스토리지에 저장
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    if (data.accessToken && data.refreshToken) {
      navigate('/login/userinfo');
    }
  } catch (error) {
    console.error('토큰을 성공적으로 받지 못했어요', error);
  }
};

const TokenManagement = () => {
  const navigate = useNavigate();

  fetchToken(navigate);

  return null;
};

export default TokenManagement;
