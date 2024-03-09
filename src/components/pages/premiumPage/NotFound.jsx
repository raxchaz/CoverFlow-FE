import React, { useState } from 'react';
import '../../../asset/sass/pages/myPage/premiumPage.scss';
import Exclamation from '../../../asset/image/exclamation.svg';
import styled from 'styled-components';
import BannerImage from '../../ui/banner/bannerImage';
import TabBar from '../../ui/tabBar/tabBar';
import { StyledPage } from '../../../styledComponent';

const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid gray;
  margin-top: 10%;
  font-family: pretendard-semibold;
`;

const StatusTab = styled.div`
  width: 50%;
  letter-spacing: -1px;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  color: gray;
  border-bottom: 2px solid transparent;
  transition:
    border-bottom 0.3s ease-in-out,
    color 0.3s ease-in-out;
  ${(props) => props.current && 'color: black; border-bottom: 3px solid black;'}
`;

const NotFound = () => {
  const [currentSection, setCurrentSection] = useState('buy');

  return (
    <StyledPage
      className="main-page-container"
      style={{ position: 'relative' }}
    >
      <TabBar />
      <StatusBar>
        <StatusTab
          current={currentSection === 'buy'}
          onClick={() => setCurrentSection('buy')}
        >
          구매하기
        </StatusTab>
        <StatusTab
          current={currentSection === 'myPremium'}
          onClick={() => setCurrentSection('myPremium')}
        >
          마이 프리미엄
        </StatusTab>
      </StatusBar>
      <BannerImage />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '50%',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        <img src={Exclamation} alt="" width={67} height={67} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          가입 내역이 없어요.
        </div>
      </div>
    </StyledPage>
  );
};

export default NotFound;
