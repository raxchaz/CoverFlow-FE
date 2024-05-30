import React, { useEffect } from 'react';
import styled from 'styled-components';
import Naver from '../../../asset/image/naver.svg';
import Google from '../../../asset/image/google.svg';
import Kakao from '../../../asset/image/kakao.svg';
import Fastlogin from '../../../asset/image/fastlogin.svg';
import '../../../asset/sass/pages/loginPage/loginPage.scss';
import TitleHeader from '../../ui/header/titleHeader';
import { useNavigate } from 'react-router-dom';
import { StyledHeader, StyledPage } from '../../../styledComponent';
import { ACCESS_TOKEN, BASE_URL } from '../../global/constants';

const WelcomeMessage = styled.p`
  margin: 30% 0% 0% 15%;
  font-size: 3.5rem;
  font-family: Pretendard-Bold;
  letter-spacing: -1px;
  color: #000;
  font-weight: bold;
  line-height: 1.2;
`;

const SecondaryMessage = styled.p`
  margin: 2% 0% 5% 15%;
  font-size: 2rem;
  letter-spacing: -1.5px;
  color: #474646;
`;

const FastLoginImage = styled.img`
  margin: 3rem 39% 0 39%;
  width: 15rem;
  height: 5rem;
`;

const HorizontalRule = styled.hr`
  border: none;
  border-top: 1px solid #d9d9d9;
  text-align: center;
  overflow: visible;
  width: 73%;

  &:after {
    content: '또는';
    font-size: 1.5rem;
    position: relative;
    top: -10px;
    background-color: white;
    color: #8c8c8c;
    letter-spacing: -1px;
    padding: 0 10px;
    margin-left: 4.8%;
    font-family: Pretendard-Medium;
  }
`;

const LoginButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginButton = styled.a`
  margin-right: 1.5%;
  margin-left: 4.5%;
`;

const KakaoLoginButton = styled.a``;

function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      alert('잘못된 접근입니다.');
      navigate('/');
    }
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader
          className="title-login"
          pageTitle="로그인"
          handleGoBack={handleGoBack}
        />

        <WelcomeMessage>
          코버플로우에 <br /> 오신 것을 환영합니다
        </WelcomeMessage>

        <SecondaryMessage>로그인을 진행해 주세요 :)</SecondaryMessage>

        <FastLoginImage src={Fastlogin} alt="빠른 로그인" />

        <KakaoLoginButton href={`${BASE_URL}/oauth2/authorization/kakao`}>
          <img src={Kakao} alt="Kakao 로그인" className="kakao-login" />
        </KakaoLoginButton>

        <HorizontalRule />

        <LoginButtonsContainer>
          <LoginButton href={`${BASE_URL}/oauth2/authorization/naver`}>
            <img src={Naver} alt="Naver 로그인" className="naver-login" />
          </LoginButton>

          <LoginButton href={`${BASE_URL}/oauth2/authorization/google`}>
            <img src={Google} alt="Google 로그인" className="google-login" />
          </LoginButton>
        </LoginButtonsContainer>
      </StyledHeader>
    </StyledPage>
  );
}

export default LoginPage;
