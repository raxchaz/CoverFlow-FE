// import React, { useEffect } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../../../asset/sass/pages/myPage/myPage.scss';
import BackButton from '../../ui/button/backButton/backButton';
import { ACCESS_TOKEN } from '../../pages/loginPage/constants/index.js';


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
  margin-left: -25%;
  margin-right: 25%;
  cursor: pointer;
`;

const LogoutButton = styled.button`
  font-size: 14px;
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function Mypage() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem(ACCESS_TOKEN);

  //   if (!token) {
  //     // 로그인 전에 마이페이지의 URL을 저장
  //     localStorage.setItem('mypageURL', '/mypage');
  //     navigate('/login');
  //   }
  // }, [navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleMypageClick = () => {
    navigate('/mypage');
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    navigate('/');
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
          <span className="mypage-title" onClick={handleMypageClick}>
            마이페이지
        </MypageHeading>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </StyledMyPage>
    </>
  );
}

export default Mypage;
