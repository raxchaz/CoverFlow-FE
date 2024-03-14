// reducers/authReducer.js
import { SET_TOKENS, CLEAR_TOKENS } from '../actions/authActions';

const initialState = {
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKENS: {
      const { accessToken, refreshToken } = action.payload;
      const expiresAt = new Date().getTime() + 60 * 60 * 1000; // 현재 시간으로부터 1시간 추가
      return { ...state, accessToken, refreshToken, expiresAt };
    }
    case CLEAR_TOKENS:
      return { ...initialState };
    default:
      return state;
  }
};

export default authReducer;
