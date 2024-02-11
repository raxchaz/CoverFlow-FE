import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ACCESS_TOKEN } from '../components/pages/loginPage/constants/index.js';

/* 메인 페이지 관련 impot */
import MainPage from '../components/pages/mainPage/mainPage';

/* 사용자 등록 페이지 관련  */
import LoginPage from '../components/pages/loginPage/loginPage';
import NicknamePage from '../components/pages/loginPage/nicknamePage';

/* 사용자 참여 페이지 관련 */
import Store from '../components/pages/storePage/storePage';
import MyPage from '../components/pages/myPage/myPage';
import NotificationPage from '../components/pages/notificationPage/notificationPage';

/* 질문 페이지 관련 */
import SearchPage from '../components/pages/searchPage/searchPage.jsx';
import CompanyRegistPage from '../components/pages/searchPage/companyRegistPage.jsx';

/* 그 외 유틸  */
import TokenManagement from '../components/global/token/tokenManagement';

/* ===================================================================  */

const AllRouter = () => {
  useEffect(() => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      localStorage.setItem(
        ACCESS_TOKEN,
        'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwNjg3OTExOSwibWVtYmVySWQiOiJmMDQyY2RlYy00ZjRkLTQxYTItODI5Zi04ZDEzZTlkNjBhYWMiLCJyb2xlIjoiTUVNQkVSIn0.Eb3gmFQd_Ig8mqOhuFpUUjGQ8pmRmmoVac0qakLTTYpq5RLkjmwdTFY2XL-AAYNSyGSWqyl2VLPdwdfliqL_OA',
      );
    }
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth/token" element={<TokenManagement />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/member-info" element={<NicknamePage />} />

        <Route path="/store" element={<Store />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/company-regist" element={<CompanyRegistPage />} />

        <Route path="/search-company" element={<SearchPage />} />
      </Routes>
    </div>
  );
};

export default AllRouter;
