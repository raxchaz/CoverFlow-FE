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
import { fetchAPI } from '../../global/utils/apiUtil';
import { ACCESS_TOKEN } from '../../global/constants';
import TabBar from '../../ui/tabBar/tabBar';
import TitleHeader from '../../ui/header/titleHeader';
import { showErrorToast } from '../../ui/toast/toast';
// import { useDispatch } from 'react-redux';

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
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [questionCnt, setQuestionCnt] = useState(0);
  const [answerCnt, setAnswerCnt] = useState(0);
  const navigate = useNavigate();
  // const dispatch = useDispatch();

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
      loadUserQuestion();
    }
  }, [navigate]);

  /* 사용자의 닉네임과 붕어빵 개수를 불러옵니다. */
  const loadUserData = async () => {
    try {
      const data = await fetchAPI('/api/member/me', 'GET');
      console.log('사용자 정보:', data);
      setNickname(data.data.nickname);
    } catch (error) {
      showErrorToast('회원 정보 불러오기 실패');
    }
  };

  const loadUserAnswer = async () => {
    try {
      const data = await fetchAPI(
        '/api/answer/me?pageNo=0&criterion=createdAt',
        'GET',
      );
      setAnswer(data.data.answers);
      setAnswerCnt(data.data.totalElements);
    } catch (error) {
      showErrorToast('답변 불러오기에 실패했습니다.');
    }
  };

  const loadUserQuestion = async () => {
    try {
      const data = await fetchAPI(
        '/api/question/me?pageNo=0&criterion=createdAt',
        'GET',
      );
      setQuestion(data.data.questions);
      setQuestionCnt(data.data.totalElements);
    } catch (error) {
      showErrorToast('질문 불러오기에 실패했습니다.');
    }
  };

  const handleGoBack = () => {
    navigate('/');
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

  /* ========================================================= */

  return (
    <>
      <StyledPage className="main-page-container">
        <StyledHeader>
          <TitleHeader pageTitle="마이 페이지" handleGoBack={handleGoBack} />

          <div className="title">
            {nickname}
            <span className="title-intro">님, 안녕하세요</span>
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
            <MyQuestion
              setQuestionCnt={setQuestionCnt}
              initiateQuestion={question}
            />
          ) : (
            <MyAnswer setAnswerCnt={setAnswerCnt} initiateAnswer={answer} />
          )}

          <TabBar />
        </StyledHeader>
      </StyledPage>
    </>
  );
}

export default Mypage;
