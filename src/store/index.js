import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import userReducer from '../store/userReducer';
import authReducer from './authReducer';
const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

/* 위 로직은 스토어를 생성하는 과정입니다.
createStore 함수에 rootReducer와 applyMiddleware(thunk)를 전달하여 스토어를 생성합니다.

 applyMiddleware(thunk)는 스토어에 Redux Thunk 미들웨어를 적용하여,
액션 생성자 안에서 비동기 작업을 할 수 있게 해줍니다.
ex) API 요청 후 결과에 따라 상태 업데이트 하는 로직 - */

export default store;
