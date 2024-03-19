import React, { useState } from 'react';

import { StyledPage } from '../../../styledComponent';

import styled from 'styled-components';
import '../../../asset/sass/pages/myPage/premiumPage.scss';
import VectorIcon from '../../../asset/image/vector.svg';
import CheckIcon from '../../../asset/image/check.svg';
import CheckIconRectangle from '../../../asset/image/check_orange.svg';
import TabBar from '../../ui/tabBar/tabBar';
import BannerImage from '../../ui/banner/bannerImage';
import { useNavigate } from 'react-router-dom';

const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid gray;
  margin-top: 10%;
  font-family: pretendard-semibold;
`;

const StatusTab = styled.div<{ $current: boolean }>`
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
  ${(props) =>
    props.$current && 'color: black; border-bottom: 3px solid black;'}
`;

type SectionProps = 'buy' | 'myPremium';

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

  return (
    <StyledPage
      className="main-page-container"
      style={{ position: 'relative' }}
    >
      <TabBar />
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
            <div className="company">코버플로우</div>
            <div className="price">9,900원</div>
            <div className="point">포인트</div>
            <div className="benefit">혜택 보기</div>
          </div>
          <div className="using-container">
            <span>사용 불가</span>
            <img loading="lazy" src={VectorIcon} />
          </div>
          <div className="pay-agreement">
            <img
              src={isChecked ? CheckIconRectangle : CheckIcon}
              alt="check"
              onClick={handleCheckClick}
            />

            <span>결제 정보 확인 및 정보 제공 동의</span>
            <span className="detail">자세히</span>
          </div>
          <button onClick={handlePaymentClick} className="button">
            동의하고 결제하기
          </button>
        </div>
      }
    </StyledPage>
  );
};

export default PremiumPage;
