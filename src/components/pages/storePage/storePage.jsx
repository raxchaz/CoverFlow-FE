import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Back from '../../../asset/image/back.svg';
import '../../../asset/sass/pages/storePage/storePage.scss';
import { ACCESS_TOKEN } from '../../pages/loginPage/constants/index.js';
import { StyledPage, Heading } from '../../../styledComponent.js';

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

  const handleStoreClick = () => {
    navigate('/notification');
  };

  return (
    <StyledPage className="main-page-container">
      <Heading>
        <img
          className="back"
          src={Back}
          onClick={handleGoBack}
          alt="뒤로 가기"
        />
        <span onClick={handleStoreClick}>상점</span>
      </Heading>
    </StyledPage>
  );
}

export default StorePage;
