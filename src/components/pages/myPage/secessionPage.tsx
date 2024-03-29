import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import SecessionSelection from '../../ui/selection/secessionSelection.jsx';
import '../../../asset/sass/pages/myPage/secessionPage.scss';
import { StyledPage, StyledHeader } from '../../../styledComponent';
import TitleHeader from '../../ui/header/titleHeader.tsx';
import TabBar from '../../ui/tabBar/tabBar';
import SecessionWarning from '../../../asset/image/secessionWarning.svg';
import { fetchAPI } from '../../global/utils/apiUtil.js';
import { showErrorToast, showSuccessToast } from '../../ui/toast/toast.tsx';

const Divider = styled.div`
  height: 0.3rem;
  background-color: #ccc;
  width: 10%;
  margin: 5% auto;
`;

function SecessionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { nickname } = location.state as { nickname: string };
  const [isAgreed, setIsAgreed] = useState(false);
  const [secessionReason, setSecessionReason] = useState('');

  const handleReasonChange = (reason: string) => {
    setSecessionReason(reason);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAgreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(event.target.checked);
  };

  const handleCancelSecession = () => {
    navigate('/info-edit');
  };

  const handleConfirmSecession = async () => {
    if (!isAgreed) {
      showErrorToast('탈퇴하기 전에, 동의해야 합니다.');
      return;
    }
    console.log('탈퇴 사유:', secessionReason);
    try {
      await fetchAPI('/api/member/leave', 'DELETE');
      showSuccessToast('성공적으로 탈퇴 처리되었습니다.');
      navigate('/');
    } catch (error) {
      showErrorToast(`탈퇴 처리 중 오류가 발생했습니다: ${error}`);
    }
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="회원 탈퇴" handleGoBack={handleGoBack} />
      </StyledHeader>

      <div className="user-nickname-container">
        <div className="user-nickname">
          {nickname}
          <span className="user-nick-cover">님 </span>
        </div>
        <div className="user-nickname"> 정말 탈퇴하시겠어요? </div>

        <div className="warning1">
          <img className="warningicon" src={SecessionWarning} />
          <div className="warning-info">
            탈퇴하시면 회원님의 모든 데이터가 전부 사라집니다. <br />
            추후 동일한 계정으로 재가입하셔도 데이터는 절대 복구되지 않아요.
          </div>
        </div>
        <div className="warning1">
          <img className="warningicon" src={SecessionWarning} />
          <div className="warning-info">
            탈퇴 후에는 작성하신 질문과 답변, 댓글을 수정하거나 <br />
            삭제하실 수 없게 되니 탈퇴 전, 꼭 반드시 확인해 주세요.
          </div>
        </div>

        <div className="warning1">
          <img className="warningicon" src={SecessionWarning} />
          <div className="warning-info">
            계정을 삭제하신 후, 7일 동안은 재가입이 불가능합니다.
          </div>
        </div>

        <Divider />
        <div className="agreement-section">
          <input
            type="checkbox"
            id="agreeSecession"
            checked={isAgreed}
            onChange={handleAgreeChange}
          />
          <label className="agreeSecession">
            안내사항을 모두 확인하였으며, 이에 동의합니다.{' '}
          </label>
        </div>
        <div className="secession-reason">
          회원님께서 계정을 탈퇴하시려는 이유가 궁금해요
        </div>
        <SecessionSelection onReasonChange={handleReasonChange} />

        <button
          className="secession-cancel-btn"
          onClick={handleCancelSecession}
        >
          취소
        </button>

        <button
          className={`confirm-secession-btn ${isAgreed ? '' : 'disabled'}`}
          onClick={handleConfirmSecession}
          disabled={!isAgreed}
        >
          탈퇴 진행하기
        </button>
      </div>
      <TabBar />
    </StyledPage>
  );
}

export default SecessionPage;
