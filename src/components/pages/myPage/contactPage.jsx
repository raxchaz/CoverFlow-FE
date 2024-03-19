import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader';
import TabBar from '../../ui/tabBar/tabBar';
import ContactSlider from '../../ui/contactSlider/contactSlider.jsx';
import '../../../asset/sass/pages/myPage/contactPage.scss';

function ContactPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="문의사항" handleGoBack={handleGoBack} />
        <ContactSlider />
      </StyledHeader>
      <TabBar />
    </StyledPage>
  );
}

export default ContactPage;
