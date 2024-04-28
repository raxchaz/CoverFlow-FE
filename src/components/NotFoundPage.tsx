import React from 'react';
import HomeLogo from '../asset/image/home.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { StyledHeader } from '../styledComponent';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10rem;
`;

const Text = styled.span`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  font-size: 3.5rem;
  font-weight: 600;
  letter-spacing: -1.8px;
  font-family: Pretendard-Bold;
`;

const Description = styled.span`
  display: flex;
  justify-content: center;
  margin-top: 1.3rem;
  text-align: center;
  font-size: 2rem;
  color: #474646;
  letter-spacing: -1px;
  font-family: Pretendard-Light;
`;

const GoHome = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5.3rem;
  background-color: transparent;
  outline: none;
  font-size: 2rem;
  text-decoration: underline;
  letter-spacing: -1px;
  cursor: pointer;
  font-family: Pretendard-Light;
`;

export const StyledPage = styled.div`
  height: 100vh;
  width: 700px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 243, 231, 1) 100%
  );
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  margin: 0 auto;
  padding: 0.5%;
  overflow: auto;
`;

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/home');
  };
  return (
    <>
      <StyledPage className="main-page-container">
        <StyledHeader>
          <Container>
            <div>
              {' '}
              <img src={HomeLogo} alt="" />
            </div>
          </Container>
          <Text>원하시는 페이지를 찾을 수 없습니다.</Text>
          <Description>
            찾으려는 페이지의 주소가 잘못 입력되었거나 <br />
            주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다.
            <br /> 입력하신 페이지의 주소가 정확한지 다시 한 번 확인해주세요
          </Description>
          <GoHome onClick={goHome}>홈으로 돌아가기</GoHome>
        </StyledHeader>
      </StyledPage>
    </>
  );
};

export default NotFoundPage;
