import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledPage } from '../../../styledComponent';
import TabBar from '../../ui/tabBar/tabBar';
import BannerImage from '../../ui/banner/bannerImage';
import '../../../asset/sass/pages/myPage/premiumPage.scss';
import VectorIcon from '../../../asset/image/vector.svg';
import { useNavigate } from 'react-router-dom';

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
  ${(props) => props.current && 'color: black; border-bottom: 4px solid black;'}
`;

const PremiumTicket = () => {
  const [currentSection, setCurrentSection] = useState('buy');
  const navigate = useNavigate();
  const handleBuyClick = () => {
    navigate('/buyer-info');
  };

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
      {currentSection === 'buy' ? (
        <div className="content-wrapper">
          <div className="unlimited-pass">무제한 패스권</div>
          <div className="button-group">
            <div className="tag">질문 열람 무제한</div>
            <div className="tag">질문 열람 무제한</div>
          </div>
          <div className="premium-info-wrapper">
            <div className="premium-info">
              <div className="price-info">
                <div className="label">프리미엄 금액</div>
                <div className="value">9,900</div>
              </div>
              <div className="duration-info">
                <div className="label">이용 기간</div>
                <div className="value">무제한</div>
              </div>
            </div>
            <img onClick={handleBuyClick} loading="lazy" src={VectorIcon} />
          </div>
        </div>
      ) : (
        <div className="content-wrapper">
          <div className="unlimited-pass">무제한 패스권</div>
          <div className="button-group">
            <div className="tag">사용 중</div>
            <div className="tag">결제일 2023-05-29</div>
          </div>
          <div className="premium-info-wrapper">
            <div className="premium-info">
              <div className="price-info">
                <div className="label">프리미엄 금액</div>
                <div className="value">얼마였더라</div>
              </div>
              <div className="duration-info">
                <div className="label">이용 기간</div>
                <div className="value">무제한</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </StyledPage>
  );
};

// const Div = styled.div`
//   display: flex;
//   margin-top: 51px;
//   width: 100%;
//   flex-direction: column;
//   font-size: 9px;
//   letter-spacing: -0.72px;
//   line-height: 128%;
//   padding: 0 57px;
// `;

// const Div2 = styled.div`
//   color: #000;
//   letter-spacing: -1.36px;
//   font:
//     600 17px Pretendard,
//     sans-serif;
// `;

// const Div3 = styled.div`
//   align-self: start;
//   display: flex;
//   gap: 6px;
//   color: #000;
//   font-weight: 300;
//   white-space: nowrap;
//   margin: 8px 0 0 10px;
// `;

// const Div6 = styled.div`
//   display: flex;
//   margin-top: 36px;
//   justify-content: space-between;
//   gap: 20px;
//   font-weight: 400;
// `;

// const Div7 = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const Div8 = styled.div`
//   display: flex;
//   justify-content: space-between;
//   gap: 20px;
// `;

// const Div9 = styled.div`
//   color: #909090;
//   font-family: Pretendard, sans-serif;
//   font-size: 12px;
// `;

// const Div10 = styled.div`
//   color: #595656;
//   font-family: Pretendard, sans-serif;
//   font-size: 12px;
// `;

// const Div11 = styled.div`
//   display: flex;
//   margin-top: 8px;
//   justify-content: space-between;
//   gap: 20px;
// `;

// const Div12 = styled.div`
//   color: #909090;
//   font-family: Pretendard, sans-serif;
//   font-size: 12px;
// `;

// const Div13 = styled.div`
//   color: #595656;
//   font-family: Pretendard, sans-serif;
//   font-size: 12px;
// `;

export default PremiumTicket;
