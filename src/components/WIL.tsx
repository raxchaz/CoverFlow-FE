import React from 'react';
import Clock from '../asset/image/clock.svg';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10rem;
`;

const Text = styled.span`
  display: flex;
  justify-content: center;
  margin-top: 0.3rem;
  font-size: 1.2rem;
  font-weight: 600;
`;

const Description = styled.span`
  display: flex;
  justify-content: center;
  margin-top: 1.3rem;
  text-align: center;
  color: #7e7e7e;
`;

const GoHome = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5.3rem;
  background-color: transparent;
  outline: none;
  text-decoration: underline;
`;

const WIL = () => {
  const navigatge = useNavigate();

  const goHome = () => {
    navigatge('/');
  };
  return (
    <>
      <Container>
        <div>
          {' '}
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
    </>
  );
};
export default WIL;
