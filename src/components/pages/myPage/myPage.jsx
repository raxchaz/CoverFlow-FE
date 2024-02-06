import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../../../asset/sass/pages/myPage/myPage.scss';
import Back from '../../../asset/image/back.svg';
// import BackButton from '../../ui/button/backButton/backButton.jsx';
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  API_BASE_URL,
} from '../../pages/loginPage/constants/index.js';

const StyledMyPage = styled.div`
  position: relative;
  height: 100vh;
  background-color: #ffffff;
`;

const MypageHeading = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1rem;
  margin-top: 10%;
  letter-spacing: -1px;
  font-weight: 600;
`;

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

function Mypage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      // 로그인 전에 마이페이지의 URL을 저장
      localStorage.setItem('mypageURL', '/mypage');
      navigate('/login');
    } else {
      loadUserNickname();
    }
  }, [navigate]);

  const loadUserNickname = () => {
    fetch(`${API_BASE_URL}api/member/find-member`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNickname(data.nickname);
      })
      .catch((error) => console.error('회원 정보 불러오기 실패:', error));
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleMypageClick = () => {
    navigate('/mypage');
  };

  const handleLogout = () => {
    fetch(`${API_BASE_URL}api/member/logout`, {
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
          setIsLoggedIn(false);
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

  return (
    <>
      <StyledMyPage className="main-page-container">
        <MypageHeading>
          <img
            className="back"
            src={Back}
            onClick={handleGoBack}
            alt="뒤로 가기"
          />
          <span className="mypage-title" onClick={handleMypageClick}>
            마이페이지{' '}
          </span>
          {isLoggedIn && <div>닉네임: {nickname}</div>}
        </MypageHeading>
        {isLoggedIn && (
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        )}
      </StyledMyPage>
    </>
  );
}

export default Mypage;
