import React from 'react';
import { StyledPage, StyledHeader } from '../../../styledComponent';
import TitleHeader from '../../ui/header/titleHeader';
import TabBar from '../../ui/tabBar/tabBar';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SecesstionLogo } from '../../../asset/image/secesstionComplete.svg';
export default function SecessionCompletePage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="회원 탈퇴" handleGoBack={handleGoBack} />
      </StyledHeader>
      <div className="secession-complete-container">
        <SecesstionLogo />
        <span className="secession-complete-title">
          회원 탈퇴가 완료되었습니다
        </span>
        <span>그동안 이용해주셔서 감사합니다</span>
      </div>
      <TabBar />
    </StyledPage>
  );
}
