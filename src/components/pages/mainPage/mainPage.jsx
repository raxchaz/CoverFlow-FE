import React from 'react';
import styled from 'styled-components';
// import TabBar from '../../ui/tabBar/tabBar.jsx';
import Header from '../../ui/header/header.jsx';
import Searchicon from '../../../asset/image/searchicon.svg';
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
  border: 1px solid #ffbd7c;
  border-radius: 10px;
  margin: 5% 0% 0% 17%;
  outline: none;

  &:focus {
    border-color: #ff8d1d;
    box-shadow: 0 0 2px rgba(106, 57, 9, 0.5);
  }

  &::placeholder {
    color: #d9d9d9;
    font-size: 0.8rem;
  }
`;

function MainPage() {
  return (
    <StyledMainPage className="main-page-container">
      <Header />
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
      <img className="search" src={Searchicon} />
      {/* <TabBar /> */}
    </StyledMainPage>
  );
}

export default MainPage;
