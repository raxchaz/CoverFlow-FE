// import React from 'react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../../../asset/sass/pages/myPage/myPage.scss';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader.jsx';
import TabBar from '../../ui/tabBar/tabBar.jsx';
import { ReactComponent as ContactIcon } from '../../../asset/image/Contact.svg';
import { ReactComponent as EditIcon } from '../../../asset/image/edit.svg';
import { ReactComponent as EventIcon } from '../../../asset/image/event.svg';
import { ReactComponent as NoticeIcon } from '../../../asset/image/notice.svg';
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

const PremiunButton = styled.button`
  white-space: nowrap;
  padding: 7px;
  width: auto;
  font-size: 12px;
  border-radius: 5px;
  margin: 13% 10% 0% 0%;
  &:hover {
    cursor: pointer;
  }
`;

const handlePremiumButtonClick = () => {
  alert('준비 중인 페이지입니다.');
};

/* ========================================================= */

function Mypage() {
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  /* 사용자의 토큰이 존재한다면, 사용자의 정보를 가져옵니다. */
  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      localStorage.setItem('mypageURL', '/mypage');
      navigate('/login');
    } else {
      console.log('사용자 정보 로딩 시작');
      loadUserData();
    }
  }, [navigate]);

  /* 사용자의 닉네임과 붕어빵 개수를 불러옵니다. */
  const loadUserData = () => {
    fetch(`${BASE_URL}/api/member/find-member`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('사용자 정보:', data);
        setNickname(data.nickname);
      })
      .catch((error) => console.error('회원 정보 불러오기 실패:', error));
  };

  /* 로그아웃 버튼을 클릭했을 경우, 서버로 로그아웃 API를 요청한 후, 
      클라이언트 측에서 리프레쉬 토큰과 엑세스 토큰을 삭제하고 메인 페이지로 돌아갑니다. */
  const handleLogout = () => {
    console.log('로그아웃 요청 시작');
    fetch(`${BASE_URL}/api/member/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('로그아웃 성공');
          localStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(REFRESH_TOKEN);
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

  /* 뒤로가기 눌렀을 경우, 한 페이지 뒤로 가는 로직입니다. */
  const handleGoBack = () => {
    navigate(-1);
  };

  const goToNotice = () => {
    navigate('/notice');
  };
  const goToEvent = () => {
    navigate('/event');
  };
  const goToContact = () => {
    navigate('/contact');
  };
  const goToEdit = () => {
    navigate('/info-edit', { state: { nickname: nickname } });
  };

  /* ========================================================= */

  return (
    <>
      <StyledPage className="main-page-container">
        <StyledHeader>
          <TitleHeader pageTitle="마이 페이지" handleGoBack={handleGoBack} />

          <div className="title-container">
            <div className="title">
              <span className="title-title"> {nickname}님, 안녕하세요</span>
            </div>
            <PremiunButton
              className="premium-button"
              onClick={handlePremiumButtonClick}
            >
              프리미엄 이용하기
            </PremiunButton>
          </div>
          <div className="mypage-select-menu">
            <div className="menu" onClick={goToNotice}>
              <NoticeIcon />
              <div className="letter">공지사항</div>
            </div>

            <div className="menu-contact" onClick={goToContact}>
              <ContactIcon />
              <div className="letter">문의하기</div>
            </div>

            <div className="menu-event" onClick={goToEvent}>
              <EventIcon />
              <div className="letter">이벤트</div>
            </div>

            <div className="menu-edit" onClick={goToEdit}>
              <EditIcon />
              <div className="letter">내 정보 수정</div>
            </div>
          </div>
          <LogoutButton className="logout-button" onClick={handleLogout}>
            로그아웃
          </LogoutButton>
          <TabBar />
        </StyledHeader>
      </StyledPage>
    </>
  );
}

export default Mypage;
