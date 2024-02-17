import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../asset/sass/pages/myPage/feedbackPage.scss';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader.jsx';
import TabBar from '../../ui/tabBar/tabBar.jsx';

function FeedbackPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="피드백 남기기" handleGoBack={handleGoBack} />
      </StyledHeader>
      <TabBar />
    </StyledPage>
  );
}

export default FeedbackPage;
