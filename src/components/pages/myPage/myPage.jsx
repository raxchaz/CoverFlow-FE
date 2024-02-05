import React from 'react';
import styled from 'styled-components';
import '../../../asset/sass/pages/myPage/myPage.scss';
import BackButton from '../../ui/button/backButton/backButton';

const StyledMyPage = styled.div`
  position: relative;
  height: 100vh;
  background-color: #ffffff;
`;

const MypageHeading = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1rem;
  margin-top: 10%;
  letter-spacing: -1px;
  font-weight: 600;
`;

function Mypage() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <StyledMyPage className="main-page-container">
        <MypageHeading>
          <BackButton onClick={handleGoBack} />
          마이페이지
        </MypageHeading>
      </StyledMyPage>
    </>
  );
}

export default Mypage;
