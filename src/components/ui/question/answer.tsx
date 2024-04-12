import React from 'react';
import '../../../asset/sass/etc/question/answer.scss';
import styled from 'styled-components';
import Trophy from '../../../asset/image/trophy.svg';

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
  border-radius: 5px;
  font-family: pretendard-extraLight;
  justify-content: space-evenly;
  border: 1px solid #428238;
  &:not(.selected) {
    background-color: transparent;
    color: #428238;
  }
`;

interface AnswerDetailProps {
  createAt: string;
  answerContent: string;
  answererNickname: string;
  answererTag?: string;
}

function AnswerModule({
  createAt,
  answerContent,
  answererNickname,
}: AnswerDetailProps) {
  return (
    <>
      <div className="answer-container">
        <div>{answererNickname}</div>
        <div>{answerContent}</div>
        <div className="user-container">{createAt}</div>
      </div>
      <AdoptButton>
        <img src={Trophy} alt="trophy" />
        채택하기
      </AdoptButton>

      <Line />
    </>
  );
}

export default AnswerModule;
