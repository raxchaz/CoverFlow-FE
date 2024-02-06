import React, { useEffect } from 'react';
import styled from 'styled-components';
import Back from '../../../asset/image/back.svg';
import Naver from '../../../asset/image/naver.svg';
import Google from '../../../asset/image/google.svg';
import Kakao from '../../../asset/image/kakao.svg';
import Fastlogin from '../../../asset/image/fastlogin.svg';
import '../../../asset/sass/pages/loginPage/loginPage.scss';
import {
  ACCESS_TOKEN,
  API_BASE_URL,
} from '../../pages/loginPage/constants/index.js';

const StyledLoginPage = styled.div`
  position: relative;
  height: 100vh;
  background-color: #ffffff;
`;

const LoginHeading = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1rem;
  margin-top: 10%;
  letter-spacing: -1px;
  font-weight: 600;
`;

const BackButton = styled.img`
  margin-left: -30%;
  margin-right: 32%;
  cursor: pointer;
`;

const WelcomeMessage = styled.p`
  margin: 20% 0% 0% 15%;
  font-size: 1.4rem;
  letter-spacing: -1px;
  color: #000;
  font-weight: bold;
  line-height: 1.2;
`;

const SecondaryMessage = styled.p`
  margin: 2% 0% 0% 15%;
  font-size: 0.8rem;
  letter-spacing: -0.5px;
  color: #474646;
  font-weight: 100;
`;

const FastLoginImage = styled.img`
  margin: 10% 0% -19% 39.6%;
`;

const HorizontalRule = styled.hr`
  border: none;
  border-top: 1px solid #d9d9d9;
  text-align: center;
  overflow: visible;
  width: 73%;

  &:after {
    content: '또는';
    font-size: 0.7rem;
    position: relative;
    top: -10px;
    background-color: white;
    color: #8c8c8c;
    letter-spacing: -1px;
    padding: 0 10px;
    margin-left: 4.8%;
  }
`;

const LoginButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginButton = styled.a`
  margin: 0 10px;
`;

function LoginPage() {
  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      alert('잘못된 접근입니다.');
      window.location.href = '/'; // 메인 페이지로 리다이렉트
    }
  }, []);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <StyledLoginPage className="main-page-container">
        <LoginHeading>
          <BackButton
            className="back"
            src={Back}
            onClick={handleGoBack}
            alt="뒤로 가기"
          />
          로그인{' '}
        </LoginHeading>

        <WelcomeMessage>
          코버플로우에 <br /> 오신 것을 환영합니다
        </WelcomeMessage>

        <SecondaryMessage>
          <p className="welcome-login2">{`로그인을 진행해 주세요 :)`}</p>
        </SecondaryMessage>

        <FastLoginImage
          src={Fastlogin}
          alt="빠른 로그인"
          className="fast-login"
        />

        <LoginButton href={`${API_BASE_URL}oauth2/authorization/kakao`}>
          <img src={Kakao} alt="Kakao 로그인" className="kakao-login" />
        </LoginButton>

        <HorizontalRule />

        <LoginButtonsContainer>
          <LoginButton href={`${API_BASE_URL}oauth2/authorization/naver`}>
            <img src={Naver} alt="Naver 로그인" className="naver-login" />
          </LoginButton>

          <LoginButton href={`${API_BASE_URL}oauth2/authorization/google`}>
            <img src={Google} alt="Google 로그인" className="google-login" />
          </LoginButton>
        </LoginButtonsContainer>
      </StyledLoginPage>
    </>
  );
}

export default LoginPage;
