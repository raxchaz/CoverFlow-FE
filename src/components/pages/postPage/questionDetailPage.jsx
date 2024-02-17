import React from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import '../../../asset/sass/pages/postPage/questionDetailPage.scss';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader.jsx';
import Answer from '../../ui/question/answer.jsx';
import TabBar from '../../ui/tabBar/tabBar.jsx';
import Chat from '../../../asset/image/chat.svg';
import View from '../../../asset/image/view.svg';
import { BASE_URL } from '../../global/constants/index.js';

function QuestionDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const Questioner = styled.div`
    font-family: pretendard-bold;
  `;

  const QuestionerTag = styled.div`
    letter-spacing: -1px;
    margin-right: 45%;
    margin-top: 0.5%;
    font-size: 13px;
  `;

  const QuestionTitle = styled.div`
    margin-top: 5%;
    font-family: pretendard-bold;
    letter-spacing: -0.5px;
  `;

  const QuestionContent = styled.div`
    margin-top: 5%;
    letter-spacing: -1px;
    font-family: pretendard-light;
  `;

  const FirstLine = styled.div`
    height: 1px;
    background-color: #cecece;
    width: 100%;
    margin: 5% 0% 0% 0%;
  `;

  const LastLine = styled.div`
    height: 0.5px;
    background-color: #cecece;
    width: 85%;
    margin: 10% 0% 0% 9%;
  `;

  const AnswerList = styled.div`
    height: 100vh;
  `;

  const {
    questioner,
    questionerTag,
    viewCount,
    answerCount,
    questionTitle,
    questionContent,
    createAt,
  } = location.state || {};

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCommentSubmit = (content, questionId) => {
    axios
      .post(`${BASE_URL}/api/answer/save-answer`, { content, questionId })
      .then((response) => {
        console.log('답변이 성공적으로 등록되었습니다.');
      })
      .catch((error) => {
        console.error('답변 등록에 실패했습니다.', error);
      });
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="상세보기" handleGoBack={handleGoBack} />
      </StyledHeader>

      <div className="question-detail-container">
        <div className="questioner-info">
          <Questioner>
            {questioner}
            <span className="middle">•</span>
          </Questioner>

          <QuestionerTag>{questionerTag}</QuestionerTag>
          <div className="question-date">{createAt}</div>
        </div>

        <FirstLine />

        <QuestionTitle>
          <span className="Q">Q. </span>
          {questionTitle}
        </QuestionTitle>

        <QuestionContent>{questionContent}</QuestionContent>

        <div className="view-info-container">
          <img className="answer-img" src={Chat} />
          <span className="answer-count">{answerCount}</span>
          <img className="answerview-img" src={View} />
          <span className="answerview-count">{viewCount}</span>
        </div>
      </div>

      <div className="comment-section">
        <textarea
          placeholder="답변을 입력해주세요.."
          className="comment-input"
          rows="4"
        ></textarea>
        <button className="submit-comment" onClick={handleCommentSubmit}>
          등록
        </button>
      </div>
      <LastLine />
      <AnswerList>
        <Answer
          answerer="김라구"
          answererTag="이직준비중"
          replyCount="7"
          answerContent="아니요"
          createAt="2023-05-23"
        />
        <Answer
          answerer="김라구"
          answererTag="이직준비중"
          replyCount="7"
          answerContent="아니요"
          createAt="2023-05-23"
        />
        <Answer
          answerer="김라구"
          answererTag="이직준비중"
          replyCount="7"
          answerContent="아니요"
          createAt="2023-05-23"
        />
      </AnswerList>
      <TabBar />
    </StyledPage>
  );
}

export default QuestionDetailPage;
