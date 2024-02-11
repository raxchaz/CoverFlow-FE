import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../asset/sass/pages/storePage/storePage.scss';
import { ACCESS_TOKEN } from '../../global/constants/index.js';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader.jsx';
import TabBar from '../../ui/tabBar/tabBar.jsx';
import UserInfoHeader from '../../ui/header/userInfoHeader.jsx';

function StorePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      localStorage.setItem('notificationPageURL', '/store');
      navigate('/login');
    }
  }, [navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="상점" handleGoBack={handleGoBack} />
        <UserInfoHeader />
        <TabBar />
      </StyledHeader>
    </StyledPage>
  );
}

export default StorePage;
