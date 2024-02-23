import React from 'react';
import PropTypes from 'prop-types';
import '../../../asset/sass/etc/question/answer.scss';
import styled from 'styled-components';
import Chat from '../../../asset/image/chat.svg';

const Line = styled.div`
  height: 1px;
  background-color: #f2f2f2;
  width: 103%;
  margin: 7% 0% -5% -1.5%;
`;

const AdoptButton = styled.button`
  position: relative;
  display: flex;
  margin: -12% 0% 0% 82%;
  padding: 5px 5px;
  font-size: 10px;
  border-radius: 1px;
  font-family: pretendard-extraLight;
`;

function AnswerModule({
  answerId,
  answerer,
  answererTag,
  answerContent,
  createAt,
  replyCount,
  onAdopt,
}) {
  return (
    <>
      <div className="answer-container">
        <div className="user-container">
          <div className="answerer-info">
            <span className="answerer">{answerer}</span>
            <span className="middle">•</span>
            <span className="answererTag">{answererTag}</span>
            <span className="answer-reply-day">{createAt}</span>
          </div>
        </div>
      </div>
      <AdoptButton onClick={onAdopt}>채택하기</AdoptButton>

      <div className="answerContent-container">
        <span className="answerContent">{answerContent}</span>
      </div>
      <div className="replyCountContainer">
        <img className="reply-img" src={Chat} />
        <span className="reply-count">{replyCount}</span>
      </div>
      <Line />
    </>
  );
}

AnswerModule.propTypes = {
  answerId: PropTypes.string.isRequired,
  answerer: PropTypes.string.isRequired,
  answererTag: PropTypes.string.isRequired,
  createAt: PropTypes.string.isRequired,
  replyCount: PropTypes.string.isRequired,
  answerContent: PropTypes.string.isRequired,
  onAdopt: PropTypes.func,
};

export default AnswerModule;
