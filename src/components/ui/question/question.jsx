import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../../asset/sass/etc/question/question.scss';
import styled, { css } from 'styled-components';
import Chat from '../../../asset/image/chat.svg';
import View from '../../../asset/image/view.svg';
import { ACCESS_TOKEN } from '../../global/constants/index.js';

const Line = styled.div`
  height: 1px;
  background-color: #f2f2f2;
  width: 103%;
  margin: 5% 0% -5% -1.5%;
`;

const LoginButton = styled.button`
  letter-spacing: -0.7px;
  background-color: #ff8d1d !important;
  border-radius: 3px;
  font-weight: 600;
  font-size: 12px;
  margin: 2% 10% 0% 40%;
  padding: 5px 5px;
  width: 15%;
`;

const ContentBlur = styled.span`
  ${({ isLoggedIn }) =>
    !isLoggedIn &&
    css`
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      filter: blur(5px);
      margin-top: 3%;
      margin-left: 10%;
      width: 80%;
      text-overflow: ellipsis;
    `}
`;

function QuestionModule({
  answerNickname,
  answerTag,
  viewCount,
  answerCount,
  createAt,
  content,
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // 로그인 페이지로 이동
  };

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      <Line />
      <div className="question-container">
        <div className="user-container">
          <div className="write-user-info">
            <span className="answer-writer">{answerNickname}</span>
            <span className="middle">•</span>
            <span className="writer-tag">{answerTag}</span>
          </div>
        </div>

        <div className="view-container">
          <img className="chat-img" src={Chat} />
          <span className="chat-count">{answerCount}</span>
          <img className="view-img" src={View} />
          <span className="view-count">{viewCount}</span>
        </div>
        <div className="field">
          <ContentBlur isLoggedIn={isLoggedIn}>
            <span className="answer-content">{content}</span>
          </ContentBlur>
          {!isLoggedIn && (
            <>
              <span className="no-login-user">
                이 기업의 질문과 답변이 궁금하신가요? <br /> 로그인하시고 기업의
                더 자세한 정보를 열람하세요{' '}
              </span>
              <LoginButton onClick={handleLoginClick}>로그인</LoginButton>
            </>
          )}
          <span className="answer-reply-day">{createAt}</span>
        </div>
      </div>
      <Line />
    </>
  );
}

QuestionModule.propTypes = {
  answerNickname: PropTypes.string.isRequired,
  answerTag: PropTypes.string.isRequired,
  viewCount: PropTypes.string.isRequired,
  answerCount: PropTypes.string.isRequired,
  createAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool,
};

export default QuestionModule;
