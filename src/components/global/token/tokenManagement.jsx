import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Base64 } from 'js-base64';
import { BASE_URL, ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/index.ts';
import { useDispatch } from 'react-redux';
import { setTokens } from '../../../store/actions/authActions';

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
  return response.headers;
};

const TokenManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get('code');
    const role = query.get('role');

    if (!code || !role) {
      console.error('코드 또는 역할이 URL에 포함되어 있지 않습니다.');
      navigate('/login');
      return;
    }

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
        setUserRole(decoded.role);
      })
      .catch((error) => {
        console.error('토큰 요청 중 오류가 발생했습니다:', error);
        alert('로그인에 실패하였습니다. 다시 시도해주세요.');
        navigate('/login');
      });
  }, [navigate, location.search, dispatch]);

  useEffect(() => {
    if (userRole === 'GUEST') {
      console.log('약관 동의 페이지로 이동합니다.');
      navigate('/login/terms');
    } else if (['MEMBER', 'PREMIUM', 'ADMIN'].includes(userRole)) {
      console.log('회원 정보가 존재합니다. 메인 페이지로 이동합니다.');
      navigate('/');
    }
  }, [userRole, navigate]);

  return null;
};

export default TokenManagement;
