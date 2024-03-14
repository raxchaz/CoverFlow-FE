import { SET_TOKENS, CLEAR_TOKENS } from './type';

// 토큰 발급 이후 시간을 측정
export const setTokens = (accessToken, refreshToken) => ({
  type: SET_TOKENS,
  payload: { accessToken, refreshToken },
});

export const clearTokens = () => ({
  type: CLEAR_TOKENS,
});
