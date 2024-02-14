// import React, { useEffect, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../../../asset/sass/pages/myPage/myPage.scss';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader.jsx';
import TabBar from '../../ui/tabBar/tabBar.jsx';
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  BASE_URL,
} from '../../global/constants/index.js';

/* 스타일 컴포넌트 정의 */
const LogoutButton = styled.button`
  font-size: 14px;
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

/* ========================================================= */

function Mypage() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [nickname, setNickname] = useState('');
  // const [rewardCount, setRewardCount] = useState(0);
  const navigate = useNavigate();

  /* 사용자의 토큰이 존재한다면, 사용자의 정보를 가져옵니다. */
  /*  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      localStorage.setItem('mypageURL', '/mypage');
      navigate('/login');
    } else {
      loadUserData();
    }
  }, [navigate]);

  /* 뒤로가기 눌렀을 경우, 한 페이지 뒤로 가는 로직입니다. */
  const handleGoBack = () => {
    navigate(-1);
  };

  /* 사용자의 닉네임과 붕어빵 개수를 불러옵니다. */
  /* const loadUserData = () => {
    fetch(`${BASE_URL}/api/member/find-member`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNickname(data.nickname);
        setRewardCount(data.fishShapedBun);
      })
      .catch((error) => console.error('회원 정보 불러오기 실패:', error));
  };
  */

  /* 로그아웃 버튼을 클릭했을 경우, 서버로 로그아웃 API를 요청한 후, 
      클라이언트 측에서 리프레쉬 토큰과 엑세스 토큰을 삭제하고 메인 페이지로 돌아갑니다. */
  const handleLogout = () => {
    fetch(`${BASE_URL}/api/member/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          localStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(REFRESH_TOKEN);
          //  setIsLoggedIn(false);
          navigate('/');
        } else {
          response
            .json()
            .then((err) => {
              console.error(
                '로그아웃 실패:',
                err.message || '서버에서 에러가 발생했습니다.',
              );
            })
            .catch((jsonError) => {
              console.error('응답 파싱 에러:', jsonError);
            });
        }
      })
      .catch((error) => {
        console.error('네트워크 에러 또는 요청 실패:', error.message);
      });
  };

  /* ========================================================= */

  return (
    <>
      <StyledPage className="main-page-container">
        <StyledHeader>
          <TitleHeader pageTitle="마이 페이지" handleGoBack={handleGoBack} />
          {/* {isLoggedIn && (
            <div className="user-greeting"><span className="nickname">{nickname}</span>님의 마이페이지</div>
          )}
          {isLoggedIn && (
            <div className="reward-status">현재 붕어빵 <span className="bun-count">{rewardCount}</span>개</div>
          )}
          {isLoggedIn && (
            <LogoutButton className="logout-button" onClick={handleLogout}>
              로그아웃
            </LogoutButton>
          )} */}

          <div className="title">
            <span className="user-nickname">병장김라구</span>님의 마이페이지
          </div>
          <div className="bun-title">
            현재 붕어빵 <span className="mypage-bun-count">2억개</span>
          </div>
          <TabBar />
          <LogoutButton className="logout-button" onClick={handleLogout}>
            로그아웃
          </LogoutButton>
        </StyledHeader>
      </StyledPage>
    </>
  );
}

export default Mypage;
