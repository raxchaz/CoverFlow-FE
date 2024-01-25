import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoggedinUser } from '../components/global/utils/apiUtil';
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from '../components/pages/loginPage/constants/';

import MainPage from '../components/pages/mainPage/mainPage';
import LoginPage from '../components/pages/loginPage/loginPage';
import NicknamePage from '../components/pages/loginPage/nicknamePage';
import MyPage from '../components/pages/myPage/myPage';
import NotificationPage from '../components/pages/notificationPage/notificationPage';
import TokenManagement from '../components/global/token/tokenManagement';

const AllRouter = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loggedinUser, setLoggedinUser] = useState(null);

  const loadCurrentlyLoggedInUser = () => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      LoggedinUser()
        .then((response) => {
          setLoggedinUser(response);
          setAuthenticated(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setAuthenticated(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setAuthenticated(false);
    setLoggedinUser(null);
    alert('로그아웃 되었습니다.');
  };

  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      loadCurrentlyLoggedInUser();
    }
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              onLogout={handleLogout}
              authenticated={authenticated}
              user={loggedinUser}
            />
          }
        />
        <Route
          path="/login"
          element={
            <LoginPage authenticated={authenticated} user={loggedinUser} />
          }
        />
        <Route
          path="/login/userinfo"
          element={
            <NicknamePage authenticated={authenticated} user={loggedinUser} />
          }
        />
        <Route
          path="/mypage"
          element={
            authenticated ? (
              <MyPage authenticated={authenticated} user={loggedinUser} />
            ) : (
              <LoginPage authenticated={authenticated} user={loggedinUser} />
            )
          }
        />
        <Route
          path="/notification"
          element={
            authenticated ? (
              <NotificationPage
                authenticated={authenticated}
                user={loggedinUser}
              />
            ) : (
              <LoginPage authenticated={authenticated} user={loggedinUser} />
            )
          }
        />
        <Route path="/auth/token" element={<TokenManagement />} />
      </Routes>
    </div>
  );
};

export default AllRouter;
