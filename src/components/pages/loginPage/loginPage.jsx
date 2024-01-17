import React from 'react';
import styled from 'styled-components';
import Back from '../../../asset/image/back.svg';
import Naver from '../../../asset/image/naver.svg';
import Google from '../../../asset/image/google.svg';
import Kakao from '../../../asset/image/kakao.svg';
import Fastlogin from '../../../asset/image/fastlogin.svg';
import '../../../asset/sass/pages/loginPage/loginPage.scss';

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
  margin: 10% 0% -14% 40%;
`;

const HorizontalRule = styled.hr`
  border: none;
  border-top: 1px solid #d9d9d9;
  text-align: center;
  overflow: visible;
  width: 75%;

  &:after {
    content: '또는';
    font-size: 0.9rem;
    position: relative;
    top: -10px;
    background-color: white;
    color: #474646;
    letter-spacing: -1px;
    padding: 0 10px;
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
          <p className="welcome-login2">{`로그인을 진행해주세요 :)`}</p>
        </SecondaryMessage>

        <FastLoginImage src={Fastlogin} alt="빠른 로그인" />

        <LoginButton href="/oauth2/authorization/kakao">
          <img src={Kakao} alt="Kakao 로그인" className="kakao-login" />
        </LoginButton>

        <HorizontalRule />

        <LoginButtonsContainer>
          <LoginButton href="/oauth2/authorization/naver">
            <img src={Naver} alt="Naver 로그인" className="naver-login" />
          </LoginButton>

          <LoginButton href="/oauth2/authorization/google">
            <img src={Google} alt="Google 로그인" className="google-login" />
          </LoginButton>
        </LoginButtonsContainer>
      </StyledLoginPage>
    </>
  );
}

export default LoginPage;
