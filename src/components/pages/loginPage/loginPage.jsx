import React from 'react';
import styled from 'styled-components';
import Back from '../../../asset/image/back.svg';
import Naver from '../../../asset/image/naver.svg';
import Google from '../../../asset/image/google.svg';
import Kakao from '../../../asset/image/kakao.svg';
import '../../../asset/sass/pages/loginPage/loginPage.scss';

const StyledLoginPage = styled.div`
  position: relative;
  height: 100vh;
  background-color: #ffffff;
`;

function LoginPage() {
  return (
    <>
      <StyledLoginPage className="main-page-container">
        <div className="login">
          <img className="back" src={Back} />
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
        <img className="kakaologo" src={Kakao} />
        <img className="naverlogo" src={Naver} />
        <img className="googlelogo" src={Google} />
      </StyledLoginPage>
    </>
  );
}

export default LoginPage;
