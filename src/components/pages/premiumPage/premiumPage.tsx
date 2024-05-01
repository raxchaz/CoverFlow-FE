import React, { useState } from 'react';

import styled from 'styled-components';
import '../../../asset/sass/pages/myPage/premiumPage.scss';
import CheckIcon from '../../../asset/image/check.svg';
import CheckIconRectangle from '../../../asset/image/check_orange.svg';
import TabBar from '../../ui/tabBar/tabBar';
import BannerImage from '../../ui/banner/bannerImage';
import { useNavigate, Link } from 'react-router-dom';
import { SectionProps } from '../../../types';
import { StyledPage, StyledHeader } from '../../../styledComponent';
import TitleHeader from '../../ui/header/titleHeader';

const StatusBar = styled.div`
  display: flex;
  width: 505px;
  justify-content: space-between;
  border-bottom: 5px solid gray;
  margin-top: 10%;
  margin-left: 15%;
  font-family: pretendard-semibold;
`;

const StatusTab = styled.div<{ $current: boolean }>`
  width: 50%;
  letter-spacing: -1px;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  color: gray;
  border-bottom: 5px solid transparent;
  margin-bottom: -5px;
  transition:
    border-bottom 0.3s ease-in-out,
    color 0.3s ease-in-out;

  ${({ $current }) =>
    $current &&
    `
    color: black;
    border-bottom: 5px solid black;
  `}
`;

const PremiumPage = () => {
  const [currentSection, setCurrentSection] = useState<SectionProps>('buy');
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const handlePaymentClick = () => {
    navigate('/not-found');
  };
  const handleCheckClick = () => {
    setIsChecked((check) => !check);
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const URL =
    'https://muddy-snowflake-048.notion.site/3065eafff7ec49acb4d45ca4261ba1cf?pvs=4';
  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="문의하기" handleGoBack={handleGoBack} />
        <TabBar />
      </StyledHeader>
      <StatusBar>
        <StatusTab
          $current={currentSection === 'buy'}
          onClick={() => setCurrentSection('buy')}
        >
          구매하기
        </StatusTab>
        <StatusTab
          $current={currentSection === 'myPremium'}
          onClick={() => setCurrentSection('myPremium')}
        >
          마이 프리미엄
        </StatusTab>
      </StatusBar>

      <BannerImage />
      {
        <div className="premium-container">
          <div className="premium-wrapper">
            <div className="premium-company">코버플로우</div>
            <div className="price">9,900원</div>
          </div>

          <div className="pay-agreement">
            <div className="pay-check">
              <img
                src={isChecked ? CheckIconRectangle : CheckIcon}
                alt="check"
                onClick={handleCheckClick}
              />

              <span>결제 정보 확인 및 정보 제공 동의</span>
            </div>
            <Link to={URL} className="detail">
              자세히
            </Link>
          </div>
          <button
            onClick={handlePaymentClick}
            className={`${isChecked === true ? 'selected' : ''}`}
          >
            동의하고 결제하기
          </button>
        </div>
      }
    </StyledPage>
  );
};

export default PremiumPage;
