import React from 'react';
import '../../../asset/sass/etc/question/answer.scss';
import styled from 'styled-components';
import Trophy from '../../../asset/image/trophy.svg';
import { fetchAPI } from '../../global/utils/apiUtil';
import { showSuccessToast } from '../toast/toast';

const AdoptButton = styled.button`
  display: flex;
  margin: -12% 0% 0% 82%;
  padding: 5px 5px;
  position: relative;
  right: 4rem;
  top: 0.625rem;
  font-size: 10px;
  border-radius: 5px;
  font-family: pretendard-extraLight;
  justify-content: space-evenly;
  border: 1px solid #428238;
  &:not(.selected) {
    background-color: transparent;
    color: #428238;
  }
  justify-content: space-around;
  align-items: center;
`;

interface AnswerDetailProps {
  createAt: string;
  answerContent: string;
  answererNickname: string;
  answererTag?: string;
  answerId: string;
}

function AnswerModule({
  createAt,
  answerContent,
  answererNickname,
  answerId,
}: AnswerDetailProps) {
  const handleAdoptAnswer = async () => {
    await fetchAPI(`/api/answer/selection/${answerId}`, 'PATCH', {
      selection: true,
    });
    if (confirm('채택하시겠습니까?'))
      showSuccessToast('답변이 채택되었습니다.');
  };

  return (
    <>
      <div className="answer-container">
        <div>{answererNickname}</div>
        <div>{answerContent}</div>
        <div className="user-container">{createAt}</div>
      </div>
      <AdoptButton onClick={handleAdoptAnswer}>
        <img src={Trophy} alt="trophy" />
        채택하기
      </AdoptButton>
    </>
  );
}

export default AnswerModule;
