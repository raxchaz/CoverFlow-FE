import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader.jsx';
import TabBar from '../../ui/tabBar/tabBar.jsx';

function NoticePage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="공지사항" handleGoBack={handleGoBack} />
      </StyledHeader>
      <TabBar />
    </StyledPage>
  );
}

export default NoticePage;
