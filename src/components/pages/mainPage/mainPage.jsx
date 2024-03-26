import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TabBar from '../../ui/tabBar/tabBar.jsx';
import Header from '../../ui/header/header.jsx';
import Searchicon from '../../../asset/image/searchicon.svg';
import UserInfoHeader from '../../ui/header/userInfoHeader.jsx';
import '../../../asset/sass/pages/mainPage/mainPage.scss';
import { StyledPage, StyledHeader } from '../../../styledComponent';
// import { EventSourcePolyfill } from 'event-source-polyfill';
// import { ACCESS_TOKEN, BASE_URL } from '../../global/constants';
const SearchInput = styled.input`
  width: 477px;
  height: 67px;
  padding: 8px;
  border: 1px solid #ffbd7c;
  border-radius: 30px;
  margin: 3% 0% 0% 17%;
  outline: none;

  &:focus {
    border-color: #ff8d1d;
    box-shadow: 0 0 2px rgba(106, 57, 9, 0.5);
  }

  &::placeholder {
    color: #cacaca;
    font-size: 1rem;
    padding-left: 10px;
  }
`;

function MainPage() {
  const navigate = useNavigate();
  localStorage.setItem('prevPage', '/');

  const handleChange = () => {
    navigate('/search-company');
  };

  return (
    <StyledPage className="main-page-deco">
      <StyledHeader />

      <Header />
      <UserInfoHeader />

      <div className="main-info">
        <span className="main-info-bold">
          <strong>기업</strong>
        </span>
        에 대해 <strong className="main-info-bold">궁금한점</strong>이 있다면,
        <br />
        <strong className="white-bold">코버플로우</strong>에서 모두
        <strong className="main-info-bold">공유</strong>하고
        <strong className="main-info-bold">해결</strong>하세요!
      </div>
      <SearchInput
        type="text"
        className="search-input-text"
        placeholder="기업 명을 검색하세요"
        onClick={handleChange}
      />
      <img className="search" src={Searchicon} />
      <TabBar />
    </StyledPage>
  );
}

export default MainPage;
