import React from 'react';
// import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
// import { ACCESS_TOKEN } from '../components/global/constants/index.js';

/* 메인 페이지 관련 impot */
import MainPage from '../components/pages/mainPage/mainPage.jsx';

/* 사용자 등록 페이지 관련  */
import LoginPage from '../components/pages/loginPage/loginPage.tsx';
import NicknamePage from '../components/pages/loginPage/nicknamePage.jsx';
import TermsPage from '../components/pages/termsPage/termsPage.jsx';

/* 사용자 참여 페이지 관련 */
import Store from '../components/pages/storePage/storePage.tsx';
import MyPage from '../components/pages/myPage/myPage.tsx';
import NotificationPage from '../components/pages/notificationPage/notificationPage.jsx';
import NoticePage from '../components/pages/myPage/noticePage.tsx';
import EventPage from '../components/pages/myPage/eventPage.jsx';
import InfoEditPage from '../components/pages/myPage/infoEditPage.jsx';
import ContactPage from '../components/pages/myPage/contactPage.jsx';
import FeedbackPage from '../components/pages/myPage/feedbackPage.jsx';
import SecessionPage from '../components/pages/myPage/secessionPage.jsx';
import SecessionCompletePage from '../components/pages/myPage/secessionCompletePage.tsx';
import CompletePaymentPage from '../components/pages/completePaymentPage/completePaymentPage.jsx';

/* 질문 페이지 관련 */
import SearchPage from '../components/pages/searchPage/searchPage.tsx';
import CompanyRegistPage from '../components/pages/searchPage/companyRegistPage.tsx';
import SearchResultPage from '../components/pages/searchPage/searchResultPage.jsx';
import CompanyInfoPage from '../components/pages/searchPage/companyInfoPage.jsx';
import QuestionWritePage from '../components/pages/postPage/questionWritePage.tsx';
import QuestionDetailPage from '../components/pages/postPage/questionDetailPage.jsx';

/* 그 외 유틸  */
import TokenManagement from '../components/global/token/tokenManagement.jsx';

/* 관리자 페이지  */
import AdminMainPage from '../components/pages/adminPage/adminMainPage.tsx';
import PremiumTicket from '../components/pages/premiumPage/premiumTicket.jsx';
import PremiumPage from '../components/pages/premiumPage/premiumPage.jsx';
import NotFound from '../components/pages/premiumPage/NotFound.jsx';

import NotFoundPage from '../components/NotFoundPage.tsx';
import WIL from '../components/WIL.tsx';

const AllRouter = () => {
  // useEffect(() => {
  //   if (!localStorage.getItem(ACCESS_TOKEN)) {
  //     localStorage.setItem(
  //       ACCESS_TOKEN,
  //       'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwNjg3OTExOSwibWVtYmVySWQiOiJmMDQyY2RlYy00ZjRkLTQxYTItODI5Zi04ZDEzZTlkNjBhYWMiLCJyb2xlIjoiTUVNQkVSIn0.Eb3gmFQd_Ig8mqOhuFpUUjGQ8pmRmmoVac0qakLTTYpq5RLkjmwdTFY2XL-AAYNSyGSWqyl2VLPdwdfliqL_OA',
  //     );
  //   }
  // }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth/token" element={<TokenManagement />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/member-info" element={<NicknamePage />} />
        <Route path="/login/terms" element={<TermsPage />} />

        <Route path="/store" element={<Store />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/premium" element={<PremiumTicket />} />
        <Route path="/buyer-info" element={<PremiumPage />} />
        <Route path="/complete-payment" element={<CompletePaymentPage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/company-regist" element={<CompanyRegistPage />} />
        <Route path="/not-found" element={<NotFound />} />

        <Route path="/notice" element={<NoticePage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/info-edit" element={<InfoEditPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/secession-page" element={<SecessionPage />} />
        <Route
          path="/secessionComplete-page"
          element={<SecessionCompletePage />}
        />

        <Route path="/search-company" element={<SearchPage />} />
        <Route path="/search-result" element={<SearchResultPage />} />
        <Route path="/company-info/:companyId" element={<CompanyInfoPage />} />

        <Route
          path="/company-info/:companyId/question-write"
          element={<QuestionWritePage />}
        />
        <Route
          path="/company-info/:companyId/:questionId"
          element={<QuestionDetailPage />}
        />

        <Route path="/minad" element={<AdminMainPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/work-progress" element={<WIL />} />
      </Routes>
    </div>
  );
};

export default AllRouter;
