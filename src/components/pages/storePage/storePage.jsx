import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Back from '../../../asset/image/back.svg';
import '../../../asset/sass/pages/storePage/storePage.scss';
import { ACCESS_TOKEN } from '../../pages/loginPage/constants/index.js';

const StyledStorePage = styled.div`
  position: relative;
  height: 100vh;
  background-color: #ffffff;
`;

const StoreHeading = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1rem;
  margin-top: 10%;
  letter-spacing: -1px;
  font-weight: 600;
`;

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
    <StyledStorePage className="main-page-container">
      <StoreHeading>
        <img
          className="back"
          src={Back}
          onClick={handleGoBack}
          alt="뒤로 가기"
        />
        <span onClick={handleStoreClick}>상점</span>
      </StoreHeading>
    </StyledStorePage>
  );
}

export default StorePage;
