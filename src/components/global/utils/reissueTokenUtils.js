import {
  BASE_URL,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  TOKEN_EXPIRES_IN,
} from '../constants';
import { setTokens } from '../../../store/actions/authActions';
import { store } from '../../../store';
import { initializeSSE } from './eventApiUtils';

export const reissueTokens = async (queryClient, dispatch) => {
  try {
    const { expiresAt } = store.getState().auth;

    if (new Date().getTime() + 3600000 >= expiresAt) {
      const response = await fetch(`${BASE_URL}/api/auth/reissue`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          'Authorization-refresh': `Bearer ${localStorage.getItem(REFRESH_TOKEN)}`,
        },
      });

      if (response.ok) {
        const newAccessToken = response.headers.get('Authorization');
        const newRefreshToken = response.headers.get('Authorization-refresh');
        localStorage.setItem(ACCESS_TOKEN, newAccessToken);
        localStorage.setItem(REFRESH_TOKEN, newRefreshToken);
        const newExpiresAt = new Date().getTime() + TOKEN_EXPIRES_IN * 1000;
        store.dispatch(
          setTokens(newAccessToken, newRefreshToken, newExpiresAt),
        );
        setTimeout(() => initializeSSE(queryClient, dispatch), 1000);
      } else {
        throw new Error('토큰 재발급 실패');
      }
    } else {
      initializeSSE(queryClient);
    }
  } catch (error) {
    console.error('ERROR_REISSUE_TOKEN, RETRY', error);
    setTimeout(() => reissueTokens(queryClient, dispatch), 5000);
  }
};
