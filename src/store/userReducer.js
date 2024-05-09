import {
  SET_LOGGED_IN,
  SET_REWARD_COUNT,
  TOGGLE_DROPDOWN,
  SET_MY_NICKNAME,
} from '../store/actions/type';

const initialState = {
  isLoggedIn: false,
  rewardCount: 0,
  isDropdownOpen: false,
  myNickName: '',
};

function userReducer(state = initialState, action) {
  /* 현재 상태인 state와 요청인 action를 받아 새로운 상태를 만들어내는 userReducer
   initialStore가 기본 상태이니 처음엔 로그인도 안 되어있고, 붕어빵도 0개라는 것! */

  switch (action.type) {
    /* switch 구문은 action에 적힌 action.type(=종류)를 확인하는 방법
     개발자가 어떤 요청을 하고 싶어하는지 알아내는 것 */

    case SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    /*
        SET_LOOGED_IN이 실행되었을 경우에 userReducer는 현재 상태인 state를 복사한 다음,
       로그인 상태 (=isLoggedIn)로 변경한다.  (== action.payload)
       즉, 사용자가 로그인을 했는지 하지 않았는지를 변경하는 로직 
  */

    case SET_REWARD_COUNT:
      return {
        ...state,
        rewardCount: action.payload,
      };
    /*
        SET_REWARD_COUNT가 실행되었을 때, userReducer는 현재 상태(state)를 복사하고,
        붕어빵의 개수를 action.payload에 따라서 변경합니다. 사용자의 붕어빵 개수 알려줌
    */

    case TOGGLE_DROPDOWN:
      return {
        ...state,
        isDropdownOpen: !state.isDropdownOpen,
      };
    case SET_MY_NICKNAME:
      return {
        ...state,
        myNickName: action.payload,
      };

    default:
      return state;
    /* 유효하지 않은 실행일 경우, 그대로 유지  */
  }
}

export default userReducer;
