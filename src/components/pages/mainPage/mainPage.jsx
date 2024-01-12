import React from 'react';
import styled from 'styled-components';
import TabBar from '../../ui/tabBar/tabBar.jsx';
import Header from '../../ui/header/header.jsx';
// import Logo from '../../../asset/image/logo.svg';
import '../../../asset/sass/pages/mainPage/mainPage.scss';

const StyledMainPage = styled.div`
  position: relative;
  height: 100vh;
  background: linear-gradient(to bottom, #ffffff, #fff3e7);
`;

const SearchInput = styled.input`
  width: 250px;
  height: 20px;
  padding: 8px;
  border: 1px solid #ff8d1d;
  border-radius: 30px;
  margin: 5% 0% 0% 17%;
`;

function MainPage() {
  return (
    <StyledMainPage className="main-page-container">
      <Header />
      {/* <img className="main-logo" src={Logo} /> */}
      <div className="coverflow">COVERFLOW</div>
      <div className="main-info">
        <span className="main-info-bold">원하는 기업에 대한 질문과 답변</span>
        을 <br />더 쉽고 빠르게 찾아보세요
      </div>
      <SearchInput
        type="text"
        className="search-input-text"
        placeholder="기업 명을 검색하세요"
      />
      <TabBar />
    </StyledMainPage>
  );
}

export default MainPage;
