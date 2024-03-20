import React from 'react';
import HomeLogo from '../asset/image/home.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

const NotFoundPage = () => {
  const navigatge = useNavigate();

  const goHome = () => {
    navigatge('/');
  };
  return (
    <>
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
    </>
  );
};

export default NotFoundPage;
