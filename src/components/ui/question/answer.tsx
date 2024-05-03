import React, { useState } from 'react';
import '../../../asset/sass/etc/question/answer.scss';
import styled from 'styled-components';
import Trophy from '../../../asset/image/trophy.svg';
import { fetchAPI } from '../../global/utils/apiUtil';
import { showSuccessToast } from '../toast/toast';

const AdoptButton = styled.button`
  display: flex;
  margin: -12% 6% 0% 82%;
  padding: 5px 5px;
  width: 85px;
  height: 25px;
  color: #428238;
  position: relative;
  font-size: 1.2rem;
  letter-spacing: -1px;
  border-radius: 5px;
  font-family: 'Pretendard-Medium';
  justify-content: space-evenly;
  border: 1px solid #428238;
  &:not(.selected) {
    background-color: transparent;
    color: #428238;
  }
  justify-content: space-around;
  align-items: center;
  img {
    width: 13px;
    height: 13px;
  }
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
  const [isAdopted, setIsAdopted] = useState(false);
  const handleAdoptAnswer = async () => {
    if (confirm('채택하시겠습니까?')) {
      await fetchAPI(`/api/answer/selection/${answerId}`, 'PATCH', {
        selection: true,
      });
      setIsAdopted(true);
      showSuccessToast('답변이 채택되었습니다.');
    }
  };

  return (
    <div className={`answer-container ${isAdopted ? 'adopted' : ''}`}>
      <div>
        <div>{answererNickname}</div>
        <div>{answerContent}</div>
        <div className="user-container">{createAt}</div>
        <AdoptButton onClick={handleAdoptAnswer}>
          <img src={Trophy} alt="trophy" />
          채택하기
        </AdoptButton>
      </div>
    </div>
  );
}

export default AnswerModule;
