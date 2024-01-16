import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainPage from '../components/pages/mainPage/mainPage';
import LoginPage from '../components/pages/loginPage/loginPage';
import NicknamePage from '../components/pages/loginPage/nicknamePage';

const AllRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/nickname" element={<NicknamePage />} />
      </Routes>
    </Router>
  );
};

export default AllRouter;
