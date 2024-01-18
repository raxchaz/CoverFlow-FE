import React from 'react';
import styled from 'styled-components';
import Back from '../../../asset/image/back.svg';
import '../../../asset/sass/pages/myPage/myPage.scss';

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

const BackButton = styled.img`
  margin-left: -20%;
  margin-right: 32%;
  cursor: pointer;
`;

function Mypage() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <StyledMyPage className="main-page-container">
        <MypageHeading>
          <BackButton
            className="back"
            src={Back}
            onClick={handleGoBack}
            alt="뒤로 가기"
          />
          마이페이지{' '}
        </MypageHeading>
      </StyledMyPage>
    </>
  );
}

export default Mypage;
