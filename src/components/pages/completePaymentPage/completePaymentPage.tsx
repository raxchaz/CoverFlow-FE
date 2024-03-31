import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import Button from '../../ui/button/Button/Button.jsx';
import check from '../../../asset/image/check_payment.svg';
import '../../../asset/sass/pages/completePaymentPage/completePaymentPage.scss';
export default function CompletePaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const payResult = location.state.data;
  // 결제 완료 페이지 입니다.
  // 기본 적으로는 home으로 이동합니다.
  // 만약 확인 후, 추가하고 싶은 navigate가 있다면 추가해주세요.

  // const payResult = {
  //   amount: '1,000,000',
  //   created_at: '2023-03-20',
  //   method: '카드',
  // };
  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <div className="check-container">
          <img className="check-payment-icon" src={check} alt="check" />
          <span className="check-payment-title">결제 완료</span>
          <span className="check-payment-content">결제가 완료되었습니다. </span>
          <span className="check-payment-content">
            아래의 내용을 확인해주세요.
          </span>
          <div className="payResult-container">
            <div className="payResult-item-container">
              <span className="payResult-item">결제 수단 </span>
              <span className="payResult-item">{payResult.method}</span>
            </div>
            <div className="payResult-item-container">
              <span className="payResult-item">결제 일시 </span>
              <span className="payResult-item">{payResult.created_at}</span>
            </div>
            <div className="payResult-item-container">
              <span className="payResult-item">결제 금액 </span>
              <span className="payResult-item">{payResult.amount}</span>
            </div>
          </div>
          <Button onClick={() => navigate('/')} variant={'noEffect'}>
            확인
          </Button>
        </div>
      </StyledHeader>
    </StyledPage>
  );
}
