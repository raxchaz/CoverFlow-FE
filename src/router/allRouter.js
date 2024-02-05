import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../components/pages/mainPage/mainPage';
import LoginPage from '../components/pages/loginPage/loginPage';
import NicknamePage from '../components/pages/loginPage/nicknamePage';
import MyPage from '../components/pages/myPage/myPage';
import NotificationPage from '../components/pages/notificationPage/notificationPage';
import TokenManagement from '../components/global/token/tokenManagement';
import Store from '../components/pages/storePage/storePage';

const AllRouter = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/member-info" element={<NicknamePage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/auth/token" element={<TokenManagement />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </div>
  );
};

export default AllRouter;
