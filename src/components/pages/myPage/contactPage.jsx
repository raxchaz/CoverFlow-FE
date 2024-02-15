import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader.jsx';
import TabBar from '../../ui/tabBar/tabBar.jsx';
import { ACCESS_TOKEN } from '../../global/constants/index.js';

function ContactPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      localStorage.setItem('prevPage', '/contact');
      navigate('/login');
    }
  }, [navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="문의사항" handleGoBack={handleGoBack} />
      </StyledHeader>
      <TabBar />
    </StyledPage>
  );
}

export default ContactPage;
