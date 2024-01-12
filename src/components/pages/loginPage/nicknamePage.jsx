import React from 'react';
import styled from 'styled-components';
import '../../../asset/sass/pages/loginPage/nicknamePage.scss';
import Back from '../../../asset/image/back.svg';

const StyledNicknamePage = styled.div`
  position: relative;
  height: 100vh;
  background-color: #ffffff;
`;

const NicknameContainer = styled.div`
  margin: 20px;
`;

const CustomInput = styled.input`
  border: none;
  border-bottom: 1px solid #333;
  width: calc(80% - 16px);
  padding: 8px;
  margin: 5% 0% 0% 10%;
  font-size: 16px;
  outline: none;

  &::placeholder {
    color: #d9d9d9;
  }

  &:focus {
    &::placeholder {
      color: #474646;
    }
    border-bottom-color: black;
    border-bottom: 2px solid black;
  }
`;

function NicknamePage() {
  return (
    <>
      <StyledNicknamePage className="main-page-container">
        <div className="nickname">
          <img className="back" src={Back} />
          닉네임 설정{' '}
        </div>

        <div className="nickname-info">
          <span className="welcome-nickname">
            원하는 닉네임을 <br /> 입력해주세요
          </span>
        </div>

        <NicknameContainer>
          <CustomInput type="text" placeholder="닉네임을 입력하세요" />
        </NicknameContainer>
      </StyledNicknamePage>
    </>
  );
}

export default NicknamePage;
