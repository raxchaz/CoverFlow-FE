import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import userReducer from '../store/userReducer';
import authReducer from './authReducer';
import alertReducer from './alertReducer';

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  alert: alertReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

// 루트 리듀서와 persistConfig를 사용하여 persistedReducer 생성
const persistedReducer = persistReducer(persistConfig, rootReducer);

// persistedReducer를 사용하여 스토어 생성
const store = createStore(persistedReducer, applyMiddleware(thunk));

// persistStore에 store를 전달하여 persistor 생성
const persistor = persistStore(store);

// 스토어와 persistor를 함께 export
export { store, persistor };

// const store = createStore(rootReducer, applyMiddleware(thunk));

/* 위 로직은 스토어를 생성하는 과정입니다.
createStore 함수에 rootReducer와 applyMiddleware(thunk)를 전달하여 스토어를 생성합니다.

 applyMiddleware(thunk)는 스토어에 Redux Thunk 미들웨어를 적용하여,
액션 생성자 안에서 비동기 작업을 할 수 있게 해줍니다.
ex) API 요청 후 결과에 따라 상태 업데이트 하는 로직 - */

// export default store;
