import React from 'react';
import '../../../asset/sass/etc/question/answer.scss';
import styled from 'styled-components';
import { AnswerProps } from '../../pages/postPage/questionDetailPage';

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

interface AnswerDetailProps {
  answererTag: string;
  answerCount: number;
  createAt: string;
  answers?: AnswerProps[];
}

function AnswerModule({ answers }: AnswerDetailProps) {
  return (
    <>
      <div className="answer-container">
        <div className="user-container">
          {answers?.map((answer) => (
            <div key={answer.answerId} className="answerer-info">
              <span>{answer.answererNickname}</span>
              <span>{answer.answerContent}</span>
              <span>{answer.createAt}</span>
            </div>
          ))}
        </div>
      </div>
      <AdoptButton>채택하기</AdoptButton>

      {/* <div className="answerContent-container"> */}
      {/* <span className="answerContent">{answerContent}</span> */}
      {/* <span className="answerContent">
          위 코드에서 position 속성을 fixed로 변경하면, 요소는 뷰포트에 상대적인
          위치가 되어 항상 화면의 가장 왼쪽 위에 고정됩니다. 이제
          .view-container는 스크롤되지 않고 항상 동일한 위치에 남게 됩니다.
        </span> */}
      {/* </div> */}
      {/* <div className="replyCountContainer"> */}
      {/* <img className="reply-img" src={Chat} /> */}
      {/* <span className="reply-count">{replyCount}</span> */}
      {/* <span className="reply-count">{replyCount}</span> */}
      {/* </div> */}
      <Line />
    </>
  );
}

export default AnswerModule;
