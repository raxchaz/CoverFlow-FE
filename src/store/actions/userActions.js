import {
  SET_LOGGED_IN,
  SET_REWARD_COUNT,
  TOGGLE_DROPDOWN,
  SET_MY_NICKNAME,
} from './type';

// 로그인 상태 설정
export const setLoggedIn = (isLoggedIn) => ({
  type: SET_LOGGED_IN,
  payload: isLoggedIn,
});

// 붕어빵 개수 설정
export const setRewardCount = (count) => ({
  type: SET_REWARD_COUNT,
  payload: count,
});

// 드롭다운 토글
export const toggleDropdown = () => ({
  type: TOGGLE_DROPDOWN,
});

// 닉네임 비교
export const setNickname = (nickname) => ({
  type: SET_MY_NICKNAME,
  payload: nickname,
});
/*
type : 변경의 종류
payload : 변경에 필요한 추가 정보를 담는 곳

ex) 
type: `SET_LOGGED_IN`
payload: true 
== 로그인 상태를 참으로 만들어라 
*/
