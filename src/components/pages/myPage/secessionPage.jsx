import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import { useNavigate, useLocation } from 'react-router-dom';
// import styled from 'styled-components';
import SecessionSelection from '../../ui/selection/secessionSelection.jsx';
import '../../../asset/sass/pages/myPage/secessionPage.scss';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader.jsx';
import TabBar from '../../ui/tabBar/tabBar.jsx';
import SecessionWarning from '../../../asset/image/secessionWarning.svg';
import { BASE_URL } from '../../global/constants/index.js';

const Divider = styled.div`
  height: 1px;
  background-color: #ccc;
  width: 10%;
  margin: 10% 0% 0% 40%;
`;

function SecessionPage() {
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(false);
  const [secessionReason, setSecessionReason] = useState('');
  // const location = useLocation();
  // const { nickname } = location.state || {};

  const handleReasonChange = (reason) => {
    setSecessionReason(reason);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAgreeChange = (event) => {
    setIsAgreed(event.target.checked);
  };

  const handleCancelSecession = () => {
    navigate('/info-edit');
  };

  const handleConfirmSecession = async () => {
    if (!isAgreed) {
      alert('탈퇴하기 전에, 동의해야 합니다.');
      return;
    }

    console.log(secessionReason);

    try {
      const response = await fetch(`${BASE_URL}/api/member/leave`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      });

      const data = await response.json();

      if (data.statusCode === '200') {
        console.log(data.message);
        alert('성공적으로 탈퇴 처리되었습니다.');
        navigate('/');
      } else {
        console.error(data.message);
        alert(`탈퇴 처리 중 오류가 발생했습니다: ${data.message}`);
      }
    } catch (error) {
      console.error('탈퇴 요청 중 오류가 발생했습니다.', error);
      alert('탈퇴 처리 중 예상치 못한 오류가 발생했습니다.');
    }
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="회원 탈퇴" handleGoBack={handleGoBack} />
      </StyledHeader>
      {/* <div className="user-nickname">{nickname}<span className="user-nick-cover">님, </span></div> */}
      {/* <div className="secession-info"> 정말로 탈퇴하시겠습니까? </div> */}
      <div className="user-nick-title">
        눅눅한 크로와상<span className="user-nick-cover">님, </span>
      </div>
      <div className="secession-info"> 정말로 탈퇴하시겠습니까? </div>
      <div className="warning1">
        <img className="warningicon" src={SecessionWarning} />{' '}
        <div className="warning-info">
          탈퇴하시면 회원님의 모든 데이터가 전부 사라집니다. <br /> 추후 동일한
          계정으로 재가입하셔도 데이터는 절대 복구되지 않아요
        </div>
      </div>
      <div className="warning1">
        <img className="warningicon" src={SecessionWarning} />{' '}
        <div className="warning-info">
          탈퇴 후에는 작성하신 질문과 답변, 댓글을 수정하거나 <br /> 삭제하실 수
          없게 되니 탈퇴 전, 꼭 반드시 확인해 주세요.
        </div>
      </div>

      <div className="warning1">
        <img className="warningicon" src={SecessionWarning} />{' '}
        <div className="warning-info2">
          계정을 삭제하신 후, 7일 동안은 재가입이 불가능합니다.
        </div>
      </div>

      <Divider />

      <div className="secession-reason">
        회원님께서 계정을
        <br />
        탈퇴하시려는 이유가 궁금해요
      </div>
      <SecessionSelection onReasonChange={handleReasonChange} />

      <div className="agreement-section">
        <input
          type="checkbox"
          id="agreeSecession"
          checked={isAgreed}
          onChange={handleAgreeChange}
        />
        <label className="agreeSecession">
          위의 탈퇴 안내 사항을 모두 읽었으며, 이에 동의합니다.
        </label>
      </div>
      <button className="secession-cancel-btn" onClick={handleCancelSecession}>
        취소
      </button>

      <button
        className={`confirm-secession-btn ${isAgreed ? '' : 'disabled'}`}
        onClick={handleConfirmSecession}
        disabled={!isAgreed}
      >
        탈퇴 진행하기
      </button>
      <TabBar />
    </StyledPage>
  );
}

export default SecessionPage;
