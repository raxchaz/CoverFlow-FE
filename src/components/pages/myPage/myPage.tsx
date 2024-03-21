// import React from 'react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../../../asset/sass/pages/myPage/myPage.scss';
import MyAnswer from '../../ui/myPageSelection/myAnswer';
import MyQuestion from '../../ui/myPageSelection/myQuestion';

import { ReactComponent as StoreIcon } from '../../../asset/image/store.svg';
import { ReactComponent as EditIcon } from '../../../asset/image/edit.svg';
import { ReactComponent as PremiumIcon } from '../../../asset/image/premium.svg';
import { ReactComponent as NoticeIcon } from '../../../asset/image/notice.svg';

import { StyledHeader, StyledPage } from '../../../styledComponent';
import { setLoggedIn } from '../../../store/actions/userActions';
import { ACCESS_TOKEN, REFRESH_TOKEN, BASE_URL } from '../../global/constants';
import TabBar from '../../ui/tabBar/tabBar';
import TitleHeader from '../../ui/header/titleHeader';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

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

// const PremiunButton = styled.button`
//   white-space: nowrap;
//   padding: 7px;
//   width: auto;
//   font-size: 12px;
//   border-radius: 1px;
//   margin: 2% 0% 0% 12%;
//   &:hover {
//     cursor: pointer;
//   }
// `;

const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 0.5rem solid rgba(255, 249, 244, 1);
  margin: 10% auto 0 auto;
  font-family: pretendard-semibold;
  width: 75%;
`;

const StatusTab = styled.div<{ current: boolean }>`
  width: 50%;
  letter-spacing: -1px;
  text-align: center;
  padding: 15px 0;
  margin-top: -0.5rem;
  cursor: pointer;
  color: gray;
  border-top: 8px solid transparent;
  font-size: 1.2rem;
  transition:
    border-top 0.3s ease-in-out,
    color 0.3s ease-in-out;
  ${(props) =>
    props.current &&
    'color: black; border-top: 8px solid rgba(255, 141, 29, 1);'}
`;

/* ========================================================= */

function Mypage() {
  const [currentCategory, setCurrentCategory] = useState('comments');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* 사용자의 토큰이 존재한다면, 사용자의 정보를 가져옵니다. */
  useEffect(() => {
    setNickname(''); // 렌덜이 전에 사용자의 nickname을 초기화!
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      localStorage.setItem('mypageURL', '/mypage');
      navigate('/login');
    } else {
      console.log('사용자 정보 로딩 시작');
      loadUserData();
      loadUserAnswer();
    }
  }, [navigate]);

  /* 사용자의 닉네임과 붕어빵 개수를 불러옵니다. */
  const loadUserData = () => {
    fetch(`${BASE_URL}/api/member/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('사용자 정보:', data);
        setNickname(data.data.nickname);
      })
      .catch((error) => toast.error('회원 정보 불러오기 실패:', error));
  };

  const loadUserAnswer = () => {
    fetch(`${BASE_URL}/api/question/me?pageNo=0&criterion=createdAt`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('사용자 정보:', data);
        setNickname(data.data.nickname);
      })
      .catch((error) => toast.error('회원 정보 불러오기 실패:', error));
  };

  /* 로그아웃 버튼을 클릭했을 경우, 서버로 로그아웃 API를 요청한 후,
      클라이언트 측에서 리프레쉬 토큰과 엑세스 토큰을 삭제하고 메인 페이지로 돌아갑니다. */
  const handleLogout = () => {
    console.log('로그아웃 요청 시작');
    fetch(`${BASE_URL}/api/member/logout`, {
      method: 'PATCH',
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
          dispatch(setLoggedIn(false));
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

  const goToContact = () => {
    navigate('/contact');
  };
  const goToPremium = () => {
    navigate('/premium');
  };
  const goToStore = () => {
    navigate('/store');
  };
  const goToEdit = () => {
    navigate('/info-edit', { state: { nickname } });
  };

  const [questionCnt, setQuestionCnt] = useState(0);
  const [answerCnt, setAnswerCnt] = useState(0);
  /* ========================================================= */

  return (
    <>
      <StyledPage className="main-page-container">
        <StyledHeader>
          <TitleHeader pageTitle="마이 페이지" handleGoBack={handleGoBack} />

          <div className="title-container">
            <div className="title">
              {nickname}
              <span className="title-intro">님, 안녕하세요</span>
            </div>
            <span className="login-status">카카오 로그인 사용 중</span>
          </div>

          <div className="mypage-select-menu">
            <div className="menu" onClick={goToContact}>
              <NoticeIcon />
              <div className="letter">문의하기</div>
            </div>

            <div className="menu-contact" onClick={goToStore}>
              <StoreIcon />
              <div className="letter">상점</div>
            </div>

            <div className="menu-event" onClick={goToPremium}>
              <PremiumIcon />
              <div className="letter">프리미엄</div>
            </div>

            <div className="menu-edit" onClick={goToEdit}>
              <EditIcon />
              <div className="letter">내 정보 수정</div>
            </div>
          </div>

          <StatusBar>
            <StatusTab
              current={currentCategory === 'comments'}
              onClick={() => setCurrentCategory('comments')}
            >
              내가 남긴 질문<span className="my-cnt">{questionCnt}</span>
            </StatusTab>
            <StatusTab
              current={currentCategory === 'posts'}
              onClick={() => setCurrentCategory('posts')}
            >
              내가 남긴 답변<span className="my-cnt">{answerCnt}</span>
            </StatusTab>
          </StatusBar>

          {currentCategory === 'comments' ? (
            <MyQuestion setQuestionCnt={setQuestionCnt} />
          ) : (
            <MyAnswer setAnswerCnt={setAnswerCnt} />
          )}
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
