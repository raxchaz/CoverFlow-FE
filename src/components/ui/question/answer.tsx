import React, { useState } from 'react';
import '../../../asset/sass/etc/question/answer.scss';
import styled from 'styled-components';
import yellowTrophy from '../../../asset/image/yellow-trophy.svg';
import Trophy from '../../../asset/image/trophy.svg';
import { fetchAPI } from '../../global/utils/apiUtil';
import { showSuccessToast } from '../toast/toast';
import Tree from '../../../asset/image/nature-ecology-tree-3--tree-plant-cloud-shape-park.svg';
import Leaf from '../../../asset/image/leaf.svg';

const AdoptedTag = styled.div`
  position: relative;
  width: 95px;
  height: 25px;
  border: 1px solid #ff8d1d;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  color: #ff8d1d;
  letter-spacing: -1px;
  font-family: Pretendard-Medium;
  top: -4.5rem;
  left: 41rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 1rem;
`;
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

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* margin-top: 1.5rem; */
`;
const ImageContainer = styled.img`
  padding-right: 5px;
  vertical-align: middle;
`;

const AnswerName = styled.span`
  font-size: 1.7rem;
  color: #000000;
  letter-spacing: -1px;
  vertical-align: middle;
`;

const AnswerContent = styled.div`
  white-space: pre-line;
  font-size: 1.8rem;
  letter-spacing: -1px;
  font-family: Pretendard-Regular;
  margin-top: 1.5rem;
  height: 180px;
`;

const BottomContainer = styled.div`
  /* vertical-align: middle; */
  flex-direction: row;
  padding-top: 3.5rem;
`;

interface AnswerDetailProps {
  createAt: string;
  answerContent: string;
  answererNickname: string;
  answererTag?: string;
  answerId?: string;
  isAdopted: boolean;
  setIsAdopted: (isAdopted: boolean) => void;
  fetchData: () => void;
  anyAdopted: boolean;
}

function AnswerModule({
  createAt,
  answerContent,
  answererNickname,
  answerId,
  isAdopted,
  setIsAdopted,
  fetchData,
  anyAdopted,
}: AnswerDetailProps) {
  const [questionerTag, setQuestionerTag] = useState('');
  console.log(setQuestionerTag);
  const handleAdoptAnswer = async () => {
    if (confirm('채택하시겠습니까?')) {
      await fetchAPI(`/api/answer/selection/${answerId}`, 'PATCH', {
        selection: true,
      });
      setIsAdopted(true);
      fetchData();
      showSuccessToast('답변이 채택되었습니다.');
    }
  };

  return (
    <div className={`answer-container ${isAdopted ? 'adopted' : 'notadopted'}`}>
      {isAdopted && (
        <AdoptedTag>
          <img src={yellowTrophy} alt="trophy" />
          채택된 답변
        </AdoptedTag>
      )}

      <div>
        <NameContainer>
          <ImageContainer
            src={questionerTag === '취준생' ? Leaf : Tree}
            alt=""
          />
          <AnswerName>{answererNickname}</AnswerName>
        </NameContainer>
        <AnswerContent className="user-contents">{answerContent}</AnswerContent>
        <BottomContainer>
          <div className="user-container">{createAt}</div>
          {isAdopted || anyAdopted ? null : (
            <AdoptButton onClick={handleAdoptAnswer}>
              <img src={Trophy} alt="trophy" />
              채택하기
            </AdoptButton>
          )}
        </BottomContainer>
      </div>
    </div>
  );
}

export default AnswerModule;
