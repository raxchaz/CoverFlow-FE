import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../asset/sass/pages/notificationPage/notificationPage.scss';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader.jsx';
import UserInfoHeader from '../../ui/header/userInfoHeader.jsx';
import TabBar from '../../ui/tabBar/tabBar.jsx';

function InfoEditPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="내 정보 수정" handleGoBack={handleGoBack} />
        <UserInfoHeader />
      </StyledHeader>
      <TabBar />
    </StyledPage>
  );
}

export default InfoEditPage;
