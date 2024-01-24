import axios from 'axios';
import { useHistory } from 'react-router-dom';

const fetchToken = async (history) => {
  try {
    const response = await axios.get('https://coverflow.co.kr/api/auth/token');
    const data = response.data;

    console.log('Access Token:', data.accessToken);
    console.log('Refresh Token:', data.refreshToken);

    // 토큰을 로컬 스토리지에 저장
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    if (data.accessToken && data.refreshToken) {
      history.push('/login/userinfo');
    }
  } catch (error) {
    console.error('토큰을 성공적으로 받지 못했어요', error);
  }
};

const TokenManagement = () => {
  const history = useHistory();

  fetchToken(history);

  return null;
};

export default TokenManagement;
