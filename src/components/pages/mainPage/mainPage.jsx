import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TabBar from '../../ui/tabBar/tabBar.jsx';
import Header from '../../ui/header/header.jsx';
import Searchicon from '../../../asset/image/searchicon.svg';
import UserInfoHeader from '../../ui/header/userInfoHeader.jsx';
import '../../../asset/sass/pages/mainPage/mainPage.scss';
import { StyledPage, StyledHeader } from '../../../styledComponent';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { ACCESS_TOKEN, BASE_URL } from '../../global/constants/index.ts';
const SearchInput = styled.input`
  width: 300px;
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
  const navigate = useNavigate();
  localStorage.setItem('prevPage', '/');

  const handleConnect = async () => {
    const res = await fetch(`${BASE_URL}/api/notification/connect`, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    console.log('res', res);
  };

  const sse = new EventSourcePolyfill(`${BASE_URL}/api/notification/connect`, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  sse.addEventListener('connect', (event) => {
    const data = event;
    console.log(data);
  });

  const handleChange = () => {
    navigate('/search-company');
  };

  return (
    <StyledPage className="main-page-deco">
      <StyledHeader />
      <UserInfoHeader />
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
        onClick={handleChange}
      />
      <img className="search" src={Searchicon} />
      <TabBar />
      <button onClick={handleConnect}>connect 요청</button>
    </StyledPage>
  );
}

export default MainPage;
