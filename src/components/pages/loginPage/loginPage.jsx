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

function LoginPage() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <StyledLoginPage className="main-page-container">
        <div className="login">
          <img
            className="back"
            src={Back}
            onClick={handleGoBack}
            alt="뒤로 가기"
          />
          로그인{' '}
        </div>

        <div className="login-info">
          <span className="welcome-login">
            코버플로우에 <br /> 오신 것을 환영합니다
          </span>
        </div>
        <div className="login-info2">
          <span className="welcome-login2">{`로그인을 진행해주세요 :)`}</span>
        </div>

        <img className="fast-login" src={Fastlogin} />

        <a href="/oauth2/authorization/kakao">
          <img src={Kakao} alt="Kakao 로그인" className="kakao-login" />
        </a>

        <hr />

        <div className="login-buttons">
          <a href="/oauth2/authorization/naver">
            <img src={Naver} alt="Naver 로그인" className="naver-login" />
          </a>

          <a href="/oauth2/authorization/google">
            <img src={Google} alt="Google 로그인" className="google-login" />
          </a>
        </div>
      </StyledLoginPage>
    </>
  );
}

export default LoginPage;
