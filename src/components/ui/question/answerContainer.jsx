import React, { useState } from 'react';
import axios from 'axios';
import AnswerModule from './AnswerModule';
import { BASE_URL } from '../../global/constants/index';

function AnswersContainer() {
  const [answers, setAnswers] = useState([]);

  const adoptAnswer = async (answerId) => {
    try {
      await axios.post(`${BASE_URL}/api/answer/selection`, {
        answerId,
        selection: true,
      });
      // 성공적으로 채택 처리된 후, 프론트엔드에서 상태 업데이트
      // 채택된 답변을 찾아 isAdopted 속성을 true로 설정하고 배열의 맨 앞으로 이동
      const updatedAnswers = answers.map((answer) => ({
        ...answer,
        isAdopted: answer.id === answerId ? true : answer.isAdopted,
      }));

      // 채택된 답변을 맨 앞으로 이동
      const adoptedAnswer = updatedAnswers.find(
        (answer) => answer.id === answerId,
      );
      const filteredAnswers = updatedAnswers.filter(
        (answer) => answer.id !== answerId,
      );
      const newAnswers = [adoptedAnswer, ...filteredAnswers];

      setAnswers(newAnswers);
    } catch (error) {
      console.error('답변 채택에 실패했습니다.', error);
    }
  };

  return (
    <div>
      {answers.map((answer) => (
        <AnswerModule
          key={answer.id}
          answerer={answer.answerer}
          answererTag={answer.answererTag}
          answerContent={answer.answerContent}
          createAt={answer.createAt}
          replyCount={answer.replyCount}
          onAdopt={() => adoptAnswer(answer.id)}
        />
      ))}
    </div>
  );
}

export default AnswersContainer;
