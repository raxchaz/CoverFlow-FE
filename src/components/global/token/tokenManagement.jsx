import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Base64 } from 'js-base64';
import { BASE_URL, ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/index.ts';
import { useDispatch } from 'react-redux';
import { setTokens } from '../../../store/actions/authActions';
// import { store } from '../../../store';
import { initializeSSE } from '../utils/eventApiUtils.js';
import { useQueryClient } from '@tanstack/react-query';

const decodeToken = (token) => {
  const payload = token.split('.')[1];
  const decodedPayload = Base64.decode(payload);
  return JSON.parse(decodedPayload);
};
const fetchToken = async (code) => {
  const response = await fetch(`${BASE_URL}/api/auth/token?code=${code}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  // console.log('fetchToken:', response);
  return response.headers;
};
const prevPage = localStorage.getItem('prevPage');

const TokenManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get('code');
    const role = query.get('role');

    console.log('code:', code);
    console.log('role:', role);

    if (!code || !role) {
      navigate('/login');
      return;
    }

    if (role === 'GUEST') {
      navigate('/login/terms', { state: {code} });
    } else {
      fetchToken(code)
        .then((headers) => {
          const accessToken = headers.get('Authorization');
          const refreshToken = headers.get('Authorization-refresh');

          if (!accessToken || !refreshToken) {
            alert('토큰을 받아오는 데 실패하였습니다. 다시 시도해주세요.');
            navigate('/login');
            return;
          }
          dispatch(setTokens(accessToken, refreshToken));
          localStorage.setItem(ACCESS_TOKEN, accessToken);
          localStorage.setItem(REFRESH_TOKEN, refreshToken);

          const decoded = decodeToken(accessToken);

          if (['MEMBER', 'PREMIUM', 'ADMIN'].includes(decoded.role)) {
            navigate(prevPage || '/');
            initializeSSE(queryClient, dispatch);
          } else {
            alert('로그인에 실패하였습니다. 다시 시도해주세요.');
            navigate('/login');
          }
        })
        .catch((error) => {
          console.error('토큰 요청 중 오류가 발생했습니다:', error);
          alert('로그인에 실패하였습니다. 다시 시도해주세요.');
          navigate('/login');
        });
    }
  }, [navigate, location, dispatch, queryClient]);
  return null;
};

export default TokenManagement;