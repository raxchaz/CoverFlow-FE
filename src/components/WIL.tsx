import React from 'react';
import Clock from '../asset/image/clock.svg';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { StyledHeader } from '../styledComponent';
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20rem;
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

const StyledPage = styled.div`
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
const WIL = () => {
  const navigatge = useNavigate();

  const goHome = () => {
    navigatge('/');
  };
  return (
    <>
      <StyledPage className="main-page-container">
        <StyledHeader>
          <Container>
            <div>
              <img src={Clock} alt="" />
            </div>
          </Container>
          <Text>현재 페이지 준비 중입니다</Text>
          <Description>
            이용에 불편을 드려 대단히 죄송합니다
            <br />
            빠른 시일 내에 준비하여 찾아뵙겠습니다
          </Description>
          <GoHome onClick={goHome}>홈으로 돌아가기</GoHome>
        </StyledHeader>
      </StyledPage>
    </>
  );
};
export default WIL;
